<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Menampilkan semua item di cart
    public function index()
    {
        $cart = Cart::with('items')->where('user_id', Auth::id())->first();

        return inertia('Cart/Index', [
            'cart' => $cart,
        ]);
    }

    // Menyimpan atau memperbarui cart
    public function store(Request $request)
    {
        $items = json_decode($request->items, true); // Decode JSON dari React

        if (!$items || !is_array($items)) {
            return response()->json(['error' => 'Format item tidak valid'], 400);
        }

        $cart = Cart::firstOrCreate(
            ['user_id' => Auth::id()],
            ['status' => 'active']
        );

        foreach ($items as $item) {
            if (!isset($item['product_id'], $item['size'], $item['type'], $item['price'], $item['quantity'])) {
                continue; // Lewatkan item yang tidak valid
            }

            $cart->items()->updateOrCreate(
                [
                    'product_id' => $item['product_id'],
                    'size' => $item['size'],
                    'type' => $item['type'],
                ],
                [
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                ]
            );
        }

        return redirect()->back()->with('success', 'Item berhasil ditambahkan ke keranjang!');
    }

    // Menghapus item dari cart
    public function destroy(CartItem $item)
    {
        $item->delete();
        return redirect()->back()->with('success', 'Item berhasil dihapus dari keranjang.');
    }
}
