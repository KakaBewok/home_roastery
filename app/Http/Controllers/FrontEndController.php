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
        $categories = Category::with('products')
            ->has('products')
            ->get();

        $products = Product::with('category.products')->get();

        $banners = Banner::orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('frontend/index', [
            'categories' => $categories,
            'banners' => $banners,
            'products' => $products,
        ]);
    }
}
