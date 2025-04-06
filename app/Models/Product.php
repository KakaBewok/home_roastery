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

    protected $appends = ['total_stock', 'starting_price', 'is_out_of_stock', 'average_rating', 'available_sizes', 'available_types', 'displayed_product_data'];

    protected static function booted(): void
    {
        self::deleting(static function (Product $product): void {
            if ($product->photos->isNotEmpty()) {
                $product->deleteAllPhotos();
            }
        });

        self::saving(static function (Product $product): void {
            $product->validateUniqueSizeAndVariantTypes();
        });
    }

    // --- RELATIONS --- //
    public function variants()
    {
        return $this->hasManyThrough(
            ProductVariant::class,   // The final target model we want to access (ProductVariant)
            ProductSize::class,      // The intermediate model that connects Product to ProductVariant
            'product_id',            // Foreign key on the intermediate table (product_sizes) that references products
            'product_size_id',       // Foreign key on the final table (product_variants) that references product_sizes
            'id',                    // Local key on the current model (products) to match with product_sizes.product_id
            'id'                     // Local key on the intermediate model (product_sizes) to match with product_variants.product_size_id
        );
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
    // --- RELATIONS --- //

    // --- ACCESSORS --- //
    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating') ?? 0;
    }

    public function getStartingPriceAttribute()
    {
        return $this->getAllVariants()
            ->where('stock', '>', 0)
            ->min('price') ?? 0;
    }

    public function getTotalStockAttribute()
    {
        return $this->getAllVariants()
            ->where('stock', '>', 0)
            ->sum('stock');
    }

    public function getIsOutOfStockAttribute()
    {
        return $this->total_stock === 0;
    }

    public function getAvailableSizesAttribute()
    {
        return $this->sizes()->select('size')->distinct()->pluck('size');
    }

    public function getAvailableTypesAttribute()
    {
        return $this->getAllVariants()
            ->pluck('type')
            ->unique()
            ->values();
    }

    public function getDisplayedProductDataAttribute()
    {
        $variants = $this->getAllVariants();
        $bestDiscountVariant = $this->getBestDiscountVariant($variants);

        return $this->formatDisplayedProductData($bestDiscountVariant);
    }
    // --- ACCESSORS --- //

    // --- HELPERS --- //
    protected function deleteAllPhotos(): void
    {
        foreach ($this->photos as $photo) {
            if (Storage::disk('public')->exists($photo->image_url)) {
                Storage::disk('public')->delete($photo->image_url);
            }
        }
    }

    protected function validateUniqueSizeAndVariantTypes(): void
    {
        $sizes = [];

        foreach ($this->sizes as $size) {
            if (in_array($size->size, $sizes)) {
                throw new \Exception('Duplicate size is not allowed in the same product!');
            }
            $sizes[] = $size->size;

            $variantTypes = [];

            foreach ($size->variants as $variant) {
                if (in_array($variant->type, $variantTypes)) {
                    throw new \Exception('Duplicate type is not allowed in the same product size!');
                }
                $variantTypes[] = $variant->type;
            }
        }
    }

    private function getAllVariants()
    {
        return $this->sizes
            ->loadMissing('variants') // only loads if not already loaded
            ->pluck('variants')
            ->flatten();
    }

    private function getBestDiscountVariant($variants)
    {
        return $variants
            ->map(fn($variant) => $this->calculateDiscountData($variant))
            ->sortByDesc('discount')
            ->first();
    }

    private function calculateDiscountData($variant)
    {
        $discount = $variant->original_price - $variant->price;
        $discountPercent = $variant->original_price > 0
            ? round(($discount / $variant->original_price) * 100)
            : 0;

        return [
            'variant' => $variant,
            'discount' => $discount,
            'discount_percent' => $discountPercent,
        ];
    }

    private function formatDisplayedProductData($bestDiscountVariant)
    {
        if ($bestDiscountVariant && $bestDiscountVariant['discount'] > 0) {
            return [
                'size' => $bestDiscountVariant['variant']->productSize->size,
                'color' => $bestDiscountVariant['variant']->color,
                'type' => $bestDiscountVariant['variant']->type,
                'price' => $bestDiscountVariant['variant']->price,
                'original_price' => $bestDiscountVariant['variant']->original_price,
                'discount' => $bestDiscountVariant['discount'],
                'discount_percent' => $bestDiscountVariant['discount_percent'] . '%'
            ];
        }

        return $this->getDefaultProductData($bestDiscountVariant['variant']);
    }

    private function getDefaultProductData($variant)
    {
        return [
            'size' => $variant->productSize->size,
            'color' => $variant->color,
            'type' => $variant->type,
            'price' => $this->getStartingPriceAttribute(),
            'original_price' => $variant->original_price,
            'discount' => 0,
            'discount_percent' => '0%'
        ];
    }
    // --- HELPERS --- //
}
