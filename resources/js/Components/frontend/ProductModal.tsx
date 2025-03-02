import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Product } from "@/types/frontend/product";
import { CartItem } from "@/types/frontend/cartItem";
import { useCart } from "@/Hooks/useCart";

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (size: string, type: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
    product,
    isOpen,
    onClose,
    onConfirm,
}) => {
    const [size, setSize] = useState("M");
    const [type, setType] = useState("Standard");
    //
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.displayed_product_data.size
    );
    const [selectedType, setSelectedType] = useState<string | null>(
        product.displayed_product_data.type
    );
    const [quantity, setQuantity] = useState<number>(1);
    const sizes = product?.sizes || [];
    const selectedProductSize = sizes.find(
        (size) => size.size === selectedSize
    );
    //get unique types
    const types =
        selectedProductSize?.variants
            .map((variant) => variant.type)
            .filter((value, index, self) => self.indexOf(value) === index) ||
        [];
    const selectedVariant = selectedProductSize?.variants.find(
        (variant) => variant.type === selectedType
    );
    const maxStock = selectedVariant?.stock || 0;
    const isVariantSelected = !!(
        selectedSize &&
        selectedType &&
        selectedVariant
    );
    const isOutOfStock = selectedVariant?.stock === 0;

    const handleAddToCart = () => {
        if (!isVariantSelected || isOutOfStock) return;

        const newItem: CartItem = {
            id: `${product.id}-${selectedSize}-${selectedType}`,
            product_id: product.id,
            size: selectedSize,
            type: selectedType,
            price: selectedVariant.price,
            quantity: quantity,
            stock: selectedVariant.stock,
        };

        addItem(newItem);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Keranjang kosong! Tambahkan produk terlebih dahulu.");
            return;
        }

        console.log("Checkout dengan produk:", cart);
        alert("Melanjutkan ke halaman checkout...");
    };
    //

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pilih Ukuran dan Tipe Produk</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex flex-col gap-5 py-5">
                        {/* size */}
                        <div>
                            <h3 className="mb-1 text-base font-medium">
                                Packaging size:{" "}
                                <span className="text-slate-400">
                                    {selectedSize}
                                </span>
                            </h3>
                            <div className="flex space-x-2">
                                {sizes.map((size) => {
                                    const hasStock = size.variants.some(
                                        (variant) => variant.stock > 0
                                    );
                                    return (
                                        <Button
                                            key={size.id}
                                            onClick={() => {
                                                setSelectedSize(size.size);
                                                setSelectedType(
                                                    size.variants.find(
                                                        (variant) =>
                                                            variant.stock > 0
                                                    )?.type ?? null
                                                );
                                            }}
                                            className={`relative px-5 py-2 border rounded-md hover:bg-transparent hover:text-inherit ${
                                                selectedSize === size.size
                                                    ? "bg-green-50 border border-green-500 text-green-600 hover:bg-green-50 hover:text-green-600"
                                                    : "bg-slate-50 border border-slate-400 text-slate-400 hover:bg-slate-50 hover:text-slate-400"
                                            } ${
                                                hasStock
                                                    ? ""
                                                    : "opacity-50 cursor-not-allowed"
                                            }`}
                                            disabled={!hasStock}
                                        >
                                            {size.size}
                                            {size.variants.filter(
                                                (variant) =>
                                                    variant.original_price > 0
                                            ).length > 0 && (
                                                <span className="absolute bottom-0 right-0 px-1 py-0 text-xs font-bold text-white transform bg-red-500 rounded-tl-md">
                                                    %
                                                </span>
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* type */}
                        <div>
                            <h3 className="mb-1 text-base font-medium">
                                Grinding options:{" "}
                                <span className="text-slate-400">
                                    {selectedType}
                                </span>
                            </h3>
                            <div className="flex space-x-2">
                                {types.map((type) => {
                                    const isAvailable =
                                        selectedProductSize?.variants.some(
                                            (variant) =>
                                                variant.type === type &&
                                                variant.stock > 0
                                        );
                                    return (
                                        <Button
                                            key={type}
                                            onClick={() => {
                                                if (isAvailable)
                                                    setSelectedType(type);
                                            }}
                                            className={`relative px-5 py-2 border rounded-md hover:bg-transparent hover:text-inherit ${
                                                selectedType === type
                                                    ? "bg-green-50 border border-green-500 text-green-600 hover:bg-green-50 hover:text-green-600"
                                                    : "bg-slate-50 border border-slate-400 text-slate-400 hover:bg-slate-50 hover:text-slate-400"
                                            } ${
                                                isAvailable
                                                    ? ""
                                                    : "opacity-30 cursor-not-allowed"
                                            }`}
                                            disabled={!isAvailable}
                                        >
                                            {isAvailable ? (
                                                type
                                            ) : (
                                                <del>{type}</del>
                                            )}
                                            {product.sizes
                                                .filter(
                                                    (size) =>
                                                        size.size ===
                                                        selectedSize
                                                )[0]
                                                .variants.filter(
                                                    (variant) =>
                                                        variant.type === type
                                                )
                                                .filter(
                                                    (variant) =>
                                                        variant.original_price >
                                                        0
                                                ).length > 0 && (
                                                <span className="absolute bottom-0 right-0 px-1 py-0 text-xs font-bold text-white transform bg-red-500 rounded-tl-md">
                                                    %
                                                </span>
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* qty */}
                        <div>
                            <h3 className="mb-1 text-base font-medium">
                                Qty:{" "}
                                <span className="text-slate-400">
                                    {quantity}
                                </span>
                            </h3>
                            <div className="flex items-end gap-3">
                                <input
                                    type="number"
                                    min="1"
                                    max={maxStock}
                                    value={quantity}
                                    onChange={(e) => {
                                        let val = parseInt(e.target.value);
                                        if (isNaN(val) || val < 1) val = 1;
                                        if (val > maxStock) val = maxStock;
                                        setQuantity(val);
                                    }}
                                    className="w-20 px-2 text-center text-green-600 border border-green-500 rounded-md bg-green-50"
                                    disabled={
                                        !selectedVariant || maxStock === 0
                                    }
                                />
                                <p
                                    className={`text-md ${
                                        maxStock > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    Max. {maxStock > 0 && maxStock}
                                </p>
                            </div>
                        </div>

                        {/* price */}
                        <div className="flex flex-col gap-2">
                            <p className="text-3xl font-extrabold">
                                Rp
                                {selectedVariant
                                    ? (
                                          selectedVariant.price * quantity
                                      ).toLocaleString("id-ID", {
                                          minimumFractionDigits: 0,
                                          maximumFractionDigits: 0,
                                      })
                                    : "0"}
                            </p>

                            {selectedVariant &&
                                selectedVariant.original_price && (
                                    <div className="flex items-center gap-2">
                                        <div className="px-2 py-1 text-xs font-bold text-red-500 bg-red-200 rounded-sm">
                                            {Math.abs(
                                                ((selectedVariant.price -
                                                    selectedVariant.original_price) /
                                                    selectedVariant.original_price) *
                                                    100
                                            ).toFixed(0)}
                                            %
                                        </div>

                                        <del className="text-gray-600 opacity-50">
                                            Rp{" "}
                                            {Math.floor(
                                                selectedVariant.original_price
                                            ).toLocaleString("id-ID", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </del>
                                    </div>
                                )}
                        </div>

                        {/* buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!isVariantSelected || isOutOfStock}
                                className={`px-6 py-3 rounded-md text-white ${
                                    isVariantSelected && !isOutOfStock
                                        ? "bg-green-500 hover:bg-green-600 transform duration-300"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleCheckout}
                                className="px-6 py-3 text-green-500 border border-green-500 rounded-md"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button onClick={() => onConfirm(size, type)}>
                        Konfirmasi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
