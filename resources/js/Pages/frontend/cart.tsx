import React from "react";
import { useCart } from "@/Hooks/useCart";

const CartPage = () => {
    const { cart, loading, addItem, removeItem, updateItem, clearCart } =
        useCart();

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart?.items.length === 0 ? (
                <p>Keranjang kosong</p>
            ) : (
                <div>
                    {cart?.items.map((item) => (
                        <div key={item.id} className="p-4 mb-4 border">
                            <h2>Product ID: {item.product_id}</h2>
                            <p>Size: {item.size}</p>
                            <p>Type: {item.type}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button
                                onClick={() =>
                                    updateItem(item.id, {
                                        quantity: item.quantity + 1,
                                    })
                                }
                            >
                                Tambah
                            </button>
                            <button onClick={() => removeItem(item.id)}>
                                Hapus
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={clearCart}
                        className="p-2 mt-4 text-white bg-red-500"
                    >
                        Kosongkan Keranjang
                    </button>
                </div>
            )}
            <div className="mt-6">
                <h3>Total Harga: {cart?.total_price}</h3>
                <h3>Total Item: {cart?.total_quantity}</h3>
            </div>
        </div>
    );
};

export default CartPage;
