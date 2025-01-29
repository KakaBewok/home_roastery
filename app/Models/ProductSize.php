<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProductSize extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'size',
        'price',
        'original_price',
        'unit',
        'stock'
    ];

    public static function rules($productId = null)
    {
        return [
            'size' => [
                'required',
                'string',
            ],
            'price' => 'required|numeric|min:0',
            'original_price' => 'numeric|min:0',
            'unit' => 'required|string',
            'unit' => [
                'required',
                'string',
            ]
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
