import { Product } from "@/types/frontend/product";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ProductDetails = ({ product }: { product: Product }) => {
    const [selectedImage, setSelectedImage] = useState<string>(
        product.photos[0].image_url
    );

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState("");

    const sizes = [...new Set(product.variants.map((variant) => variant.size))];
    const colors = [
        ...new Set(product.variants.map((variant) => variant.color)),
    ];
    const types = [...new Set(product.variants.map((variant) => variant.type))];

    const selectedVariant = product.variants.find(
        (variant) =>
            variant.size === selectedSize &&
            variant.color === selectedColor &&
            variant.type === selectedType
    );

    const maxStock = selectedVariant ? selectedVariant.stock : 0;
    const isVariantSelected =
        selectedSize && selectedColor && selectedType && selectedVariant;
    const isOutOfStock = selectedVariant && selectedVariant.stock === 0;

    const handleAddToCart = () => {
        if (!isVariantSelected || isOutOfStock) return;

        const newItem = {
            id: selectedVariant.id,
            name: product.name,
            size: selectedSize,
            color: selectedColor,
            type: selectedType,
            price: selectedVariant.price,
            quantity: quantity,
        };

        setCart([...cart, newItem]);
        setNotification("Produk berhasil ditambahkan ke keranjang!");

        setTimeout(() => setNotification(""), 3000); // Hapus notifikasi setelah 3 detik
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            setNotification(
                "Keranjang kosong! Tambahkan produk terlebih dahulu."
            );
            setTimeout(() => setNotification(""), 3000);
            return;
        }

        console.log("Checkout dengan produk:", cart);
        alert("Melanjutkan ke halaman checkout...");
    };

    return (
        <div className="flex flex-col max-w-4xl gap-6 p-4 mx-auto md:flex-row">
            {/* Gambar Produk */}

            <div className="w-full md:w-1/2">
                {/* Tampilan Desktop (Gambar Besar + Thumbnail) */}
                <div className="hidden md:block">
                    <img
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }/storage/${selectedImage}`}
                        alt="Product Image"
                        className="object-cover w-full border rounded-lg h-96"
                    />
                    {/* Thumbnail */}
                    <div className="flex gap-2 mt-4">
                        {product.photos.map((image, index) => (
                            <img
                                key={index}
                                src={`${import.meta.env.VITE_APP_URL}/storage/${
                                    image.image_url
                                }`}
                                alt="Thumbnail"
                                className={`w-20 h-20 object-cover cursor-pointer border-2 ${
                                    selectedImage === image.image_url
                                        ? "border-blue-500"
                                        : "border-gray-300"
                                }`}
                                onClick={() =>
                                    setSelectedImage(image.image_url)
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* Tampilan Mobile (Swiper Carousel) */}
                <div className="block md:hidden">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full"
                    >
                        {product.photos.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={`${
                                        import.meta.env.VITE_APP_URL
                                    }/storage/${image.image_url}`}
                                    alt="Product Image"
                                    className="object-cover w-full rounded-lg h-80"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p>{product.description}</p>

                {/* Notifikasi */}
                {notification && (
                    <div className="p-2 mt-2 text-green-800 bg-green-300 rounded">
                        {notification}
                    </div>
                )}

                {/* Pilihan Ukuran */}
                <div>
                    <h3 className="mt-4 font-semibold">Pilih Ukuran:</h3>
                    <div className="flex space-x-2">
                        {sizes.map((size) => {
                            const hasStock = product.variants.some(
                                (variant) =>
                                    variant.size === size && variant.stock > 0
                            );
                            return (
                                <button
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        setSelectedColor(null);
                                        setSelectedType(null);
                                    }}
                                    className={`px-4 py-2 border rounded ${
                                        selectedSize === size
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200"
                                    } ${
                                        hasStock
                                            ? ""
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    disabled={!hasStock}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Pilihan Warna */}
                <div>
                    <h3 className="mt-4 font-semibold">Pilih Warna:</h3>
                    <div className="flex space-x-2">
                        {colors.map((color) => {
                            const isAvailable = product.variants.some(
                                (variant) =>
                                    variant.color === color &&
                                    (!selectedSize ||
                                        variant.size === selectedSize) &&
                                    variant.stock > 0
                            );
                            return (
                                <button
                                    key={color}
                                    onClick={() => {
                                        if (isAvailable) {
                                            setSelectedColor(color);
                                            setSelectedType(null);
                                        }
                                    }}
                                    className={`px-4 py-2 border rounded ${
                                        selectedColor === color
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200"
                                    } ${
                                        isAvailable
                                            ? ""
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    disabled={!isAvailable}
                                >
                                    {color}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Pilihan Tipe */}
                <div>
                    <h3 className="mt-4 font-semibold">Pilih Tipe Bahan:</h3>
                    <div className="flex space-x-2">
                        {types.map((type) => {
                            const isAvailable = product.variants.some(
                                (variant) =>
                                    variant.type === type &&
                                    (!selectedSize ||
                                        variant.size === selectedSize) &&
                                    (!selectedColor ||
                                        variant.color === selectedColor) &&
                                    variant.stock > 0
                            );
                            return (
                                <button
                                    key={type}
                                    onClick={() => {
                                        if (isAvailable) setSelectedType(type);
                                    }}
                                    className={`px-4 py-2 border rounded ${
                                        selectedType === type
                                            ? "bg-yellow-500 text-white"
                                            : "bg-gray-200"
                                    } ${
                                        isAvailable
                                            ? ""
                                            : "opacity-50 cursor-not-allowed"
                                    }`}
                                    disabled={!isAvailable}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Harga & Stok */}
                <div className="mt-4">
                    <p className="text-lg font-semibold">
                        Harga: Rp{" "}
                        {selectedVariant
                            ? selectedVariant.price.toLocaleString()
                            : "0"}
                    </p>
                    <p
                        className={`text-md ${
                            maxStock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        Stok: {maxStock > 0 ? maxStock : "Habis"}
                    </p>
                </div>

                {/* Pilihan Quantity */}
                <div className="mt-4">
                    <h3 className="font-semibold">Jumlah:</h3>
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
                        className="w-20 p-2 text-center border rounded"
                        disabled={!selectedVariant || maxStock === 0}
                    />
                </div>

                {/* Tombol Add to Cart & Checkout */}
                <div className="flex mt-6 space-x-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={!isVariantSelected || isOutOfStock}
                        className={`px-6 py-3 rounded text-white ${
                            isVariantSelected && !isOutOfStock
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={handleCheckout}
                        className="px-6 py-3 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};
