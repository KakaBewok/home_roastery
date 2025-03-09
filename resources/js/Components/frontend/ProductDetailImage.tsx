import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Product } from "@/types/frontend/product";

export const ProductDetailImage = ({
    product,
    selectedImage,
    imageNotFound,
    setSelectedImage,
    className,
}: {
    product: Product;
    selectedImage: string;
    imageNotFound: string;
    setSelectedImage: (image: string) => void;
    className?: string;
}) => {
    return (
        <div className="w-full md:w-1/2">
            {/* Desktop */}
            <div className="hidden md:block">
                {product.photos && product.photos.length > 0 ? (
                    <img
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }/storage/${selectedImage}`}
                        alt="Product photo"
                        className={className}
                    />
                ) : (
                    <img
                        src={`${selectedImage}`}
                        alt="Product photo"
                        className={className}
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
                            onClick={() => setSelectedImage(image.image_url)}
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
    );
};
