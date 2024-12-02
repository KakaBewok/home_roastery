<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductObserver
{
    /**
     * Handle the Product "deleting" event.
     */
    public function deleting(Product $product): void
    {
        if ($product->photos->isNotEmpty()) {
            foreach ($product->photos as $photo) {
                if (Storage::disk('public')->exists($photo->image_url)) {
                    Storage::disk('public')->delete($photo->image_url);
                }
            }
        }
    }
}
