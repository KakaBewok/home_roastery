<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Banner extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        self::deleting(static function (Banner $banner): void {
            if (Storage::disk('public')->exists($banner->banner_url)) {
                Storage::disk('public')->delete($banner->banner_url);
            }
        });
    }

    protected $fillable = [

        'name',
        'banner_url'
    ];
}
