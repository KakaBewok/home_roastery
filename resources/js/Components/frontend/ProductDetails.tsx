import { Product } from "@/types/frontend/product";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import imageNotFound from "../../../../public/images/image-not-found.jpg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Price from "./Price";
import { Button } from "../ui/button";

export const ProductDetails = ({ product }: { product: Product }) => {
    const [selectedImage, setSelectedImage] = useState<string>(
        product.photos && product.photos.length > 0
            ? product.photos[0].image_url
            : imageNotFound
    );

    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.displayed_product_data.size
    );
    const [selectedColor, setSelectedColor] = useState<string | null>(
        product.displayed_product_data.color
    );
    const [selectedType, setSelectedType] = useState<string | null>(
        product.displayed_product_data.type
    );
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState("");

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showReadMore, setShowReadMore] = useState<boolean>(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const lineHeight = parseFloat(
                getComputedStyle(descriptionRef.current).lineHeight
            );
            const maxHeight = lineHeight * 5;
            setShowReadMore(descriptionRef.current.scrollHeight > maxHeight);
        }
    }, [product.description]);

    const sizes = product?.sizes || [];
    const selectedProductSize = sizes.find(
        (size) => size.size === selectedSize
    );
    const colors =
        selectedProductSize?.variants
            .map((variant) => variant.color)
            .filter((value, index, self) => self.indexOf(value) === index) ||
        [];
    const types =
        selectedProductSize?.variants
            .filter((variant) => variant.color === selectedColor)
            .map((variant) => variant.type)
            .filter((value, index, self) => self.indexOf(value) === index) ||
        [];

    const selectedVariant = selectedProductSize?.variants.find(
        (variant) =>
            variant.color === selectedColor && variant.type === selectedType
    );

    const maxStock = selectedVariant?.stock || 0;
    const isVariantSelected = !!(
        selectedSize &&
        selectedColor &&
        selectedType &&
        selectedVariant
    );
    const isOutOfStock = selectedVariant?.stock === 0;

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
        <div className="flex flex-col w-full gap-10 py-12 md:flex-row md:px-3">
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

            {/* <div className="w-full overflow-y-auto scrollbar-hide"> */}
            <div className="w-full md:w-1/2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400">
                <div className="px-5">
                    <div className="mb-4">
                        <h1 className="text-xl font-bold md:text-2xl">
                            {product.name}
                        </h1>
                        <h3 className="text-sm font-normal md:text-lg text-slate-500">
                            {product.category.name}
                        </h3>
                    </div>

                    {/* description */}
                    <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-900">
                            Description
                        </h3>

                        {product.description?.trim() ? (
                            <>
                                <div
                                    ref={descriptionRef}
                                    className={`prose-sm prose text-pretty text-xs/5 md:text-sm/5 text-slate-500 ${
                                        isExpanded ? "" : "line-clamp-5"
                                    }`}
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {product.description}
                                    </ReactMarkdown>
                                </div>
                                {showReadMore && (
                                    <button
                                        onClick={() =>
                                            setIsExpanded(!isExpanded)
                                        }
                                        className="mt-1 text-xs underline text-slate-500"
                                    >
                                        {isExpanded ? "Show less" : "Read more"}
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-sm font-light text-slate-400">
                                No description.
                            </p>
                        )}
                    </div>

                    {/* Notifikasi */}
                    {notification && (
                        <div className="p-2 mt-2 text-green-800 bg-green-300 rounded">
                            {notification}
                        </div>
                    )}

                    <div className="flex flex-col gap-5 py-5">
                        {/* Pilihan Ukuran */}
                        <div>
                            <h3 className="font-semibold">
                                Size options: {selectedSize}
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
                                                setSelectedColor(
                                                    size.variants[0].color ??
                                                        null
                                                );
                                                setSelectedType(
                                                    size.variants[0].type ??
                                                        null
                                                );
                                            }}
                                            className={`relative px-4 py-2 border rounded-md hover:bg-transparent hover:text-inherit ${
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
                                                // <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 ">
                                                <span className="absolute bottom-0 right-0 px-1 py-0 text-xs font-bold text-white transform bg-red-500 rounded-tl-md">
                                                    %
                                                </span>
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pilihan Warna */}
                        {/* <div>
                        <h3 className="font-semibold">Colors</h3>
                        <div className="flex space-x-2">
                            {colors.map((color) => {
                                const isAvailable =
                                    selectedProductSize?.variants.some(
                                        (variant) =>
                                            variant.color === color &&
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
                    </div> */}

                        {/* Pilihan Tipe */}
                        <div>
                            <h3 className="font-semibold">Types</h3>
                            <div className="flex space-x-2">
                                {types.map((type) => {
                                    const isAvailable =
                                        selectedProductSize?.variants.some(
                                            (variant) =>
                                                variant.type === type &&
                                                variant.color ===
                                                    selectedColor &&
                                                variant.stock > 0
                                        );
                                    return (
                                        <Button
                                            key={type}
                                            onClick={() => {
                                                if (isAvailable)
                                                    setSelectedType(type);
                                            }}
                                            className={`relative px-4 py-2 border rounded-md hover:bg-transparent hover:text-inherit ${
                                                selectedType === type
                                                    ? "bg-green-50 border border-green-500 text-green-600 hover:bg-green-50 hover:text-green-600"
                                                    : "bg-slate-50 border border-slate-400 text-slate-400 hover:bg-slate-50 hover:text-slate-400"
                                            } ${
                                                isAvailable
                                                    ? ""
                                                    : "opacity-50 cursor-not-allowed"
                                            }`}
                                            disabled={!isAvailable}
                                        >
                                            {type}
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

                        {/* Harga & Stok */}
                        <div>
                            <p className="text-lg font-semibold">
                                Rp{" "}
                                {selectedVariant
                                    ? selectedVariant.price.toLocaleString()
                                    : "0"}
                            </p>
                            <del className="text-gray-600 opacity-60">
                                {selectedVariant
                                    ? selectedVariant.original_price
                                        ? selectedVariant.original_price.toLocaleString()
                                        : ""
                                    : "0"}
                            </del>
                            <p
                                className={`text-md ${
                                    maxStock > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                Stok {maxStock > 0 ? maxStock : "Habis"}
                            </p>
                        </div>

                        {/* Pilihan Quantity */}
                        <div>
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
        </div>
    );
};
