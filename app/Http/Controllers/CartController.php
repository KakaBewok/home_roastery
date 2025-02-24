<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function show(Request $request)
    {
        $cart = Cart::with('cartItems.product')
            ->where('user_id', $request->user()->id)
            ->firstOrCreate(['user_id' => $request->user()->id]);

        return Inertia::render('frontend/cart', [
            'cart' => $cart
        ]);
    }

    public function addItem(Request $request)
    {
        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'size' => 'required|string',
            'type' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $cart->cartItems()->create($validated);

        return redirect()->back();
    }

    public function updateItem(Request $request, $id)
    {
        $item = CartItem::findOrFail($id);
        $validated = $request->validate([
            'quantity' => 'nullable|integer|min:1',
            'price' => 'nullable|numeric',
        ]);

        $item->update($validated);

        return redirect()->back();
    }

    public function removeItem($id)
    {
        $item = CartItem::findOrFail($id);
        $item->delete();

        return redirect()->back();
    }

    public function clearCart(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)->first();
        if ($cart) {
            $cart->cartItems()->delete();
        }

        return redirect()->back();
    }

    public function checkout(Request $request)
    {
        $cart = Cart::with('cartItems.product')
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        try {
            DB::transaction(function () use ($cart) {
                foreach ($cart->cartItems as $item) {
                    // Lock produk untuk menghindari race condition
                    $product = $item->product()->lockForUpdate()->first();

                    // Validasi stok
                    if ($product->stock < $item->quantity) {
                        throw new \Exception("Stok tidak mencukupi untuk {$product->name}");
                    }

                    // Kurangi stok
                    $product->stock -= $item->quantity;
                    $product->save();
                }

                // Kosongkan keranjang setelah checkout
                $cart->cartItems()->delete();
            });

            return redirect()->back()->with('success', 'Checkout berhasil! Stok produk telah diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['stock' => $e->getMessage()]);
        }
    }
}
