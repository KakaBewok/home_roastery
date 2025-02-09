import { Product } from "@/types/frontend/product";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import imageNotFound from "../../../../public/images/image-not-found.jpg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ProductDetails = ({ product }: { product: Product }) => {
    const [selectedImage, setSelectedImage] = useState<string>(
        product.photos && product.photos.length > 0
            ? product.photos[0].image_url
            : imageNotFound
    );

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState("");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
        <div className="flex flex-col w-full gap-10 py-12 border border-red-500 md:flex-row">
            <div className="w-full md:w-1/2">
                {/* Desktop */}
                <div className="hidden md:block">
                    {product.photos && product.photos.length > 0 ? (
                        <img
                            src={`${
                                import.meta.env.VITE_APP_URL
                            }/storage/${selectedImage}`}
                            alt="Product photo"
                            className="object-cover w-full border rounded-sm h-96"
                        />
                    ) : (
                        <img
                            src={`${selectedImage}`}
                            alt="Product photo"
                            className="object-cover w-full border rounded-sm h-96"
                        />
                    )}
                    {/* Thumbnail */}
                    <div className="flex gap-2 mt-4">
                        {product.photos.map((image, index) => (
                            <img
                                key={index}
                                src={`${import.meta.env.VITE_APP_URL}/storage/${
                                    image.image_url
                                }`}
                                alt="Thumbnail"
                                className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-sm ${
                                    selectedImage === image.image_url
                                        ? "border-orange-500"
                                        : "border-slate-200"
                                }`}
                                onClick={() =>
                                    setSelectedImage(image.image_url)
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* mobile */}
                <div className="block md:hidden">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="w-full"
                    >
                        {product.photos && product.photos.length > 0 ? (
                            product.photos.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`${
                                            import.meta.env.VITE_APP_URL
                                        }/storage/${image.image_url}`}
                                        alt="Product Image"
                                        className="object-cover w-full h-80"
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <img
                                    src={`${imageNotFound}`}
                                    alt="Product Image"
                                    className="object-cover w-full h-80"
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>

            {/* baca lagi disini */}
            <div className="w-full px-5 border border-green-500 md:w-1/2">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <h3 className="text-lg font-normal text-slate-500">
                        {product.category.name}
                    </h3>
                </div>

                <div className="mb-4">
                    <h3 className="text-base font-bold text-slate-900">
                        Description
                    </h3>
                    <div
                        className={`prose-sm prose text-pretty text-sm/4 text-slate-500 ${
                            isExpanded ? "" : "line-clamp-6"
                        }`}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {product.description}
                        </ReactMarkdown>
                    </div>
                    {/* Read More or Show Less button */}
                    {!isExpanded && (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="mt-1 text-xs underline text-slate-500"
                        >
                            Read more
                        </button>
                    )}
                    {isExpanded && (
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="mt-1 text-xs underline text-slate-500"
                        >
                            Show less
                        </button>
                    )}
                </div>

                {/* Notifikasi */}
                {notification && (
                    <div className="p-2 mt-2 text-green-800 bg-green-300 rounded">
                        {notification}
                    </div>
                )}

                <div className="flex flex-col gap-5 py-5 border border-red-500">
                    {/* size option */}
                    <div>
                        <h3 className="font-semibold">Pilih Ukuran:</h3>
                        <div className="flex space-x-2">
                            {sizes.map((size) => {
                                const hasStock = product.variants.some(
                                    (variant) =>
                                        variant.size === size &&
                                        variant.stock > 0
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
                        <h3 className="font-semibold">Pilih Warna:</h3>
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
                        <h3 className="font-semibold">Pilih Tipe Bahan:</h3>
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
                                            if (isAvailable)
                                                setSelectedType(type);
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
                    <div className="">
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
                    <div className="">
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
                    <div className="flex space-x-4">
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
        </div>
    );
};
