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

    protected $with = ['photos', 'category', 'variants']; //eager loading

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

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating');
    }

    public function getStartingPriceAttribute()
    {
        return $this->variants()->min('price');
    }

    public function getTotalStockAttribute()
    {
        return $this->variants()->sum('stock');
    }

    public function getIsOutOfStockAttribute()
    {
        return $this->variants()->sum('stock') === 0;
    }
}
