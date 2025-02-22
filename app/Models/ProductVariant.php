<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_size_id',
        'type',
        'price',
        'original_price',
        'stock'
    ];

    public function productSize(): BelongsTo
    {
        return $this->belongsTo(ProductSize::class);
    }
}
