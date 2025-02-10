<?php

namespace App\Models;

use App\Models\CartItem;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\Photo;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'is_publish'
    ];

    protected $with = ['photos', 'category', 'sizes']; //eager loading

    protected $appends = ['total_stock', 'starting_price', 'is_out_of_stock', 'average_rating'];

    protected static function booted(): void
    {
        self::deleting(static function (Product $product): void {
            if ($product->photos->isNotEmpty()) {
                foreach ($product->photos as $photo) {
                    if (Storage::disk('public')->exists($photo->image_url)) {
                        Storage::disk('public')->delete($photo->image_url);
                    }
                }
            }
        });

        self::saving(static function (Product $product): void {
            $variants = $product->variants;
            $existVariants = [];

            foreach ($variants as $variant) {
                $variantKey = $variant->size . '-' . $variant->color . '-' . $variant->type;

                if (in_array($variantKey, $existVariants)) {
                    throw new \Exception('Duplicate size, color, and type combination are not allowed.');
                }

                $existVariants[] = $variantKey;
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function sizes()
    {
        return $this->hasMany(ProductSize::class);
    }

    //

    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating') ?? 0;
    }

    public function getStartingPriceAttribute()
    {
        return $this->sizes()->with('variants')->get()->pluck('variants')->flatten()->where('stock', '>', 0)->min('price') ?? 0;
    }

    public function getTotalStockAttribute()
    {
        return $this->sizes()->with('variants')->get()->pluck('variants')->flatten()->sum('stock');
    }

    public function getIsOutOfStockAttribute()
    {
        return $this->total_stock === 0;
    }

    // //

    public function getAvailableSizesAttribute()
    {
        return $this->sizes()->select('size')->distinct()->pluck('size');
    }

    public function getAvailableColorsAttribute($size)
    {
        return $this->sizes()
            ->where('size', $size)
            ->with('variants')
            ->get()
            ->pluck('variants')
            ->flatten()
            ->pluck('color')
            ->unique()
            ->values();
    }
    //
    public function getAvailableColorsBySizeAndTypeAttribute($size, $type)
    {
        return $this->sizes()
            ->where('size', $size) // Filter berdasarkan ukuran (size)
            ->with(['variants' => function ($query) use ($type) {
                $query->where('type', $type); // Filter berdasarkan tipe (type)
            }])
            ->get()
            ->pluck('variants') // Mengambil koleksi variants dari setiap size
            ->flatten() // Menggabungkan semua varian
            ->pluck('color') // Mengambil hanya warna
            ->unique() // Menghapus warna yang duplikat
            ->values(); // Mengatur ulang indeks array
    }

    public function getAvailableTypesBySizeAttribute($size)
    {
        return $this->sizes()
            ->where('size', $size) // Filter berdasarkan ukuran (size)
            ->with('variants') // Memuat relasi variants
            ->get()
            ->pluck('variants') // Mengambil semua varian dari setiap size
            ->flatten() // Menggabungkan semua koleksi varian
            ->pluck('type') // Mengambil hanya tipe (type)
            ->unique() // Menghapus tipe yang duplikat
            ->values(); // Mengatur ulang indeks array
    }

    public function getAvailableTypesBySizeAndColorAttribute($size, $color)
    {
        return $this->sizes()
            ->where('size', $size) // Filter berdasarkan ukuran (size)
            ->with(['variants' => function ($query) use ($color) {
                $query->where('color', $color); // Filter berdasarkan warna (color)
            }])
            ->get()
            ->pluck('variants') // Mengambil semua varian dari setiap size
            ->flatten() // Menggabungkan semua koleksi varian
            ->pluck('type') // Mengambil hanya tipe (type)
            ->unique() // Menghapus tipe yang duplikat
            ->values(); // Mengatur ulang indeks array
    }

    public function getDisplayedProductData()
    {
        // Ambil semua varian dari ukuran produk
        $variants = $this->sizes()
            ->with('variants')
            ->get()
            ->pluck('variants')
            ->flatten();

        // Cari varian dengan diskon tertinggi
        $bestDiscountVariant = $variants
            ->map(function ($variant) {
                $discount = $variant->original_price - $variant->price; // Hitung diskon
                return [
                    'variant' => $variant,
                    'discount' => $discount,
                ];
            })
            ->sortByDesc('discount') // Urutkan dari diskon tertinggi
            ->first(); // Ambil item pertama (tertinggi)

        // Jika ada varian dengan diskon tertinggi, tampilkan varian tersebut
        if ($bestDiscountVariant && $bestDiscountVariant['discount'] > 0) {
            return [
                'size' => $bestDiscountVariant['variant']->productSize->size,
                'color' => $bestDiscountVariant['variant']->color,
                'type' => $bestDiscountVariant['variant']->type,
                'price' => $bestDiscountVariant['variant']->price,
                'original_price' => $bestDiscountVariant['variant']->original_price,
                'discount' => $bestDiscountVariant['discount']
            ];
        }

        // Jika tidak ada diskon, tampilkan harga termurah (starting_price)
        return [
            'size' => null, // Tidak ada ukuran spesifik
            'color' => null, // Tidak ada warna spesifik
            'type' => null, // Tidak ada tipe spesifik
            'price' => $this->getStartingPriceAttribute(), // Ambil harga termurah
            'original_price' => null,
            'discount' => 0
        ];
    }
}
