<?php

namespace App\Models;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'shipping_method',
        'tracking_number',
        'shipping_cost',
        'status'
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
