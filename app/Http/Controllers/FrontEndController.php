<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class FrontEndController extends Controller
{
    public function index()
    {
        $categories = Category::with(['products' => function ($query) {
            $query->where('is_publish', true);
        }])
            ->whereHas('products', function ($query) {
                $query->where('is_publish', true);
            })
            ->get();

        $products = Product::with([
            'photos',
            'category.products',
            'sizes.variants'
        ])
            ->where('is_publish', true)
            ->get();

        $banners = Banner::orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('frontend/index', [
            'categories' => $categories,
            'banners' => $banners,
            'products' => $products,
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['sizes', 'photos', 'category', 'sizes.variants'])->findOrFail($id);
        return Inertia::render('frontend/product-details', ['product' => $product]);
    }
}
