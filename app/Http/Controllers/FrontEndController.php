<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class FrontEndController extends Controller
{
    public function index()
    {
        $products = Product::all();
        // $category = $product->category;
        // $photos = $product->photos;
        return Inertia::render('frontend/index', [
            'products' => $products
        ]);
    }
}
