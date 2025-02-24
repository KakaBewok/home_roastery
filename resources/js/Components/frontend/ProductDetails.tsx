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
import { Star } from "lucide-react";
import { Cart } from "@/types/frontend/cart";
import { usePage } from "@inertiajs/react";
import { useCart } from "@/Hooks/useCart";
import { CartItem } from "@/types/frontend/cartItem";

export const ProductDetails = ({ product }: { product: Product }) => {
    const { auth } = usePage().props;
    const [selectedImage, setSelectedImage] = useState<string>(
        product.photos && product.photos.length > 0
            ? product.photos[0].image_url
            : imageNotFound
    );
    const roundedRating = Math.ceil(product.average_rating || 0);

    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.displayed_product_data.size
    );
    const [selectedType, setSelectedType] = useState<string | null>(
        product.displayed_product_data.type
    );
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    // const [notification, setNotification] = useState("");

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

        // Tambahkan ke cart menggunakan custom hook
        addItem(newItem);
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

            <div className="w-full md:w-1/2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400">
                <div className="px-5">
                    <div className="mb-4">
                        <h1 className="text-xl font-bold md:text-2xl">
                            {product.name}
                        </h1>
                        <h3 className="text-sm font-normal md:text-lg text-slate-500">
                            {product.category.name}
                        </h3>
                        {roundedRating > 3 && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={
                                                i < roundedRating
                                                    ? "text-yellow-500 h-4 w-4"
                                                    : "text-gray-200 h-4 w-4"
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-normal text-slate-600">
                                    ({roundedRating}.0)
                                </span>
                                <span className="text-sm font-normal text-slate-600">
                                    {product.reviews.length > 0
                                        ? `${product.reviews.length} Reviews`
                                        : ""}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Notifikasi */}
                    {/* {notification && (
                        <div className="p-2 mt-2 text-green-800 bg-green-300 rounded">
                            {notification}
                        </div>
                    )} */}

                    <div className="flex flex-col gap-5 py-5">
                        {/* Pilihan Ukuran */}
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

                        {/* Pilihan Tipe */}
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

                        {/* Pilihan Quantity */}
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

                        {/* Harga & Stok */}
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

                        {/* Tombol Add to Cart & Checkout */}
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

                    <hr className="my-7" />

                    {/* description */}
                    <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-900">
                            Description
                        </h3>

                        {product.description?.trim() ? (
                            <>
                                <div
                                    ref={descriptionRef}
                                    className={`prose-sm prose text-pretty text-xs/5 md:text-sm/6 text-slate-500 ${
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
                </div>
            </div>
        </div>
    );
};
