<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use Inertia\Inertia;

class FrontEndController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')->get();
        $banners = Banner::all();

        return Inertia::render('frontend/index', [
            'categories' => $categories,
            'banners' => $banners,
        ]);
    }
}
