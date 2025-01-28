<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    public static function rules()
    {
        return [
            'size' => [
                'required',
                'string',
                Rule::unique('product_sizes')->where(fn($query) => $query->where('product_id', $this->product_id)),
            ],
            'price' => 'required|numeric|min:0',
            'original_price' => 'numeric|min:0',
            'unit' => 'required|string',
            'stock' => 'required|numeric|min:0',
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
