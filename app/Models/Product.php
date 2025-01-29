<?php

namespace App\Models;

use App\Models\CartItem;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\Photo;
use App\Models\ProductSize;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
    ];

    protected $with = ['photos', 'category', 'sizes'];

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
            $sizes = $product->sizes;
            $existSize = [];

            foreach ($sizes as $size) {
                $newSize = $size->size;

                if (in_array($newSize, $existSize)) {
                    throw new \Exception('Duplicate size are not allowed.');
                }

                $existSize[] = $newSize;
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

    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating');
    }

    public function getStartingPriceAttribute()
    {
        return $this->sizes()->min('price');
    }

    public function getTotalStockAttribute()
    {
        return $this->sizes()->sum('stock');
    }

    public function getIsOutOfStockAttribute()
    {
        return $this->sizes()->sum('stock') === 0;
    }
}
