// export const useCart = () => {
//     const [cart, setCart] = useState<Cart>({
//         id: "",
//         userId: "",
//         items: [],
//         total_quantity: 0,
//         total_price: 0,
//     });
//     const [notification, setNotification] = useState<string | null>(null);

//     const addToCart = (newItem: CartItem) => {
//         const existingItemIndex = cart.items.findIndex(
//             (item) =>
//                 item.product_id === newItem.product_id &&
//                 item.size === newItem.size &&
//                 item.type === newItem.type
//         );

//         let updatedCartItems = [...cart.items];
//         let updatedTotalQuantity = cart.total_quantity;
//         let updatedTotalPrice = cart.total_price;

//         if (existingItemIndex !== -1) {
//             const existingItem = updatedCartItems[existingItemIndex];

//             if (existingItem.quantity + newItem.quantity > newItem.stock) {
//                 setNotification("Jumlah melebihi stok yang tersedia!");
//                 return;
//             }

//             // Update quantity jika item sudah ada
//             updatedCartItems[existingItemIndex] = {
//                 ...existingItem,
//                 quantity: existingItem.quantity + newItem.quantity,
//             };
//         } else {
//             // Tambahkan item baru
//             updatedCartItems.push(newItem);
//         }

//         // Update total quantity dan total price
//         updatedTotalQuantity += newItem.quantity;
//         updatedTotalPrice += newItem.price * newItem.quantity;

//         // Update cart state
//         const updatedCart: Cart = {
//             ...cart,
//             items: updatedCartItems,
//             total_quantity: updatedTotalQuantity,
//             total_price: updatedTotalPrice,
//         };

//         setCart(updatedCart);

//         // Kirim data ke backend menggunakan Inertia
//         router.post("/cart", { items: JSON.stringify(updatedCartItems) });

//         // Notifikasi berhasil
//         setNotification("Produk berhasil ditambahkan ke keranjang!");
//         setTimeout(() => setNotification(null), 3000);
//     };

//     return { cart, addToCart, notification };
// };

import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Cart } from "@/types/frontend/cart";
import { CartItem } from "@/types/frontend/cartItem";

export const useCart = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch cart dari backend
    const fetchCart = async () => {
        setLoading(true);
        try {
            router.get(
                "/cart",
                {},
                {
                    onSuccess: (page) => {
                        setCart(page.props.cart as Cart);
                    },
                }
            );
        } finally {
            setLoading(false);
        }
    };

    // Tambah item ke cart
    const addItem = async (item: Partial<CartItem>) => {
        setLoading(true);
        try {
            router.post("/cart/items", item, {
                onSuccess: () => fetchCart(),
            });
        } finally {
            setLoading(false);
        }
    };

    // Update item di cart
    const updateItem = async (itemId: string, data: Partial<CartItem>) => {
        setLoading(true);
        try {
            router.put(`/cart/items/${itemId}`, data, {
                onSuccess: () => fetchCart(),
            });
        } finally {
            setLoading(false);
        }
    };

    // Hapus item dari cart
    const removeItem = async (itemId: string) => {
        setLoading(true);
        try {
            router.delete(`/cart/items/${itemId}`, {
                onSuccess: () => fetchCart(),
            });
        } finally {
            setLoading(false);
        }
    };

    // Kosongkan cart
    const clearCart = async () => {
        setLoading(true);
        try {
            router.delete("/cart/clear", {
                onSuccess: () => fetchCart(),
            });
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchCart();
    // }, []);

    return {
        cart,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clearCart,
    };
};
