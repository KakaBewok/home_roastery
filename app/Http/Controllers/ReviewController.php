<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        // $product->reviews()->create([
        //     'user_id' => auth()->id(),
        //     'comment' => $validated['comment'],
        // ]);

        return back()->with('message', 'Review berhasil ditambahkan.');
    }
}
