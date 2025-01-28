<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class RatingController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // $product->ratings()->create([
        //     'user_id' => auth()->user()->id,
        //     'rating' => $validated['rating'],
        // ]);

        return back()->with('message', 'Rating berhasil ditambahkan.');
    }
}
