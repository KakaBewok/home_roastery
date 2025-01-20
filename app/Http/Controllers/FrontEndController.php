<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use Inertia\Inertia;

class FrontEndController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')
            ->withCount('products')
            ->orderBy('products_count', 'desc')
            ->has('products')
            ->get();

        $products = $categories->flatMap->products;

        $banners = Banner::orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('frontend/index', [
            'categories' => $categories,
            'banners' => $banners,
            'products' => $products,
        ]);
    }
}
