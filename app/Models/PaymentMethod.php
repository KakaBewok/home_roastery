<?php

namespace App\Models;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

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

    protected static function booted(): void
    {
        self::deleting(static function (PaymentMethod $paymentMethod): void {
            if ($paymentMethod->bank_logo && Storage::disk('public')->exists($paymentMethod->bank_logo)) {
                Storage::disk('public')->delete($paymentMethod->bank_logo);
            }

            if ($paymentMethod->qr_image && Storage::disk('public')->exists($paymentMethod->qr_image)) {
                Storage::disk('public')->delete($paymentMethod->qr_image);
            }
        });

        self::updating(static function (PaymentMethod $paymentMethod): void {
            if ($paymentMethod->isDirty('bank_logo')) {
                $oldBankLogo = $paymentMethod->getOriginal('bank_logo');
                if ($oldBankLogo && Storage::disk('public')->exists($oldBankLogo)) {
                    Storage::disk('public')->delete($oldBankLogo);
                }
            }

            if ($paymentMethod->isDirty('qr_image')) {
                $oldQrImage = $paymentMethod->getOriginal('qr_image');
                if ($oldQrImage && Storage::disk('public')->exists($oldQrImage)) {
                    Storage::disk('public')->delete($oldQrImage);
                }
            }
        });
    }

    public function payment(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
