<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Product;
use Inertia\Inertia;

class FrontEndController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $banners = Banner::all();

        return Inertia::render('frontend/index', [
            'products' => $products,
            'banners' => $banners
        ]);
    }
}
