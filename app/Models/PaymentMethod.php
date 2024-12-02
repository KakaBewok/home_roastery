<?php

namespace App\Models;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'bank_name',
        'bank_logo',
        'account_number',
        'account_holder',
        'qr_image',
        'status'
    ];

    public function payment(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
