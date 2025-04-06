<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class MainController extends Controller
{
    public function home_page()
    {
        $categories = Category::with(['products' => fn($q) => $q->where('is_publish', true)])
            ->whereHas('products', fn($q) => $q->where('is_publish', true))
            ->get();

        $products = Product::with(
            'photos',
            'category.products',
            'sizes.variants'
        )
            ->where('is_publish', true)
            ->get();

        $banners = Banner::latest()->get();

        return Inertia::render('frontend/homepage', compact('categories', 'banners', 'products'));
    }

    public function product_details($id)
    {
        $product = Product::with([
            'sizes.variants',
            'photos',
            'category',
            'reviews',
        ])->findOrFail($id);

        return Inertia::render('frontend/product-details', compact('product'));
    }
}
