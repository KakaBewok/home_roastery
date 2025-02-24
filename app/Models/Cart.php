<?php

namespace App\Models;

use App\Models\CartItem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];

    protected $appends = ['total_price', 'total_quantity'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function getTotalPriceAttribute()
    {
        return $this->cartItems->sum(function ($item) {
            return $item->price * $item->quantity ?? 0;
        }) ?? 0;
    }

    public function getTotalQuantityAttribute()
    {
        return $this->cartItems->sum('quantity') ?? 0;
    }
}
