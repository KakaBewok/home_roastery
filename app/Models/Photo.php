<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_url',
        'product_id'
    ];

    protected static function booted(): void
    {
        self::deleting(static function (Photo $photo): void {
            if (Storage::disk('public')->exists($photo->image_url)) {
                Storage::disk('public')->delete($photo->image_url);
            }
        });
    }
}
