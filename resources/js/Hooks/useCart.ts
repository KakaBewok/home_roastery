import { useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { Cart } from "@/types/frontend/cart";
import { CartItem } from "@/types/frontend/cartItem";

export const useCart = () => {
    const [cart, setCart] = useState<Cart>({
        id: "",
        userId: "",
        items: [],
        total_quantity: 0,
        total_price: 0,
    });
    const [notification, setNotification] = useState<string | null>(null);

    const addToCart = (newItem: CartItem) => {
        const existingItemIndex = cart.items.findIndex(
            (item) =>
                item.product_id === newItem.product_id &&
                item.size === newItem.size &&
                item.type === newItem.type
        );

        let updatedCartItems = [...cart.items];
        let updatedTotalQuantity = cart.total_quantity;
        let updatedTotalPrice = cart.total_price;

        if (existingItemIndex !== -1) {
            const existingItem = updatedCartItems[existingItemIndex];

            if (existingItem.quantity + newItem.quantity > newItem.stock) {
                setNotification("Jumlah melebihi stok yang tersedia!");
                return;
            }

            // Update quantity jika item sudah ada
            updatedCartItems[existingItemIndex] = {
                ...existingItem,
                quantity: existingItem.quantity + newItem.quantity,
            };
        } else {
            // Tambahkan item baru
            updatedCartItems.push(newItem);
        }

        // Update total quantity dan total price
        updatedTotalQuantity += newItem.quantity;
        updatedTotalPrice += newItem.price * newItem.quantity;

        // Update cart state
        const updatedCart: Cart = {
            ...cart,
            items: updatedCartItems,
            total_quantity: updatedTotalQuantity,
            total_price: updatedTotalPrice,
        };

        setCart(updatedCart);

        // Kirim data ke backend menggunakan Inertia
        router.post("/cart", { items: JSON.stringify(updatedCartItems) });

        // Notifikasi berhasil
        setNotification("Produk berhasil ditambahkan ke keranjang!");
        setTimeout(() => setNotification(null), 3000);
    };

    return { cart, addToCart, notification };
};
