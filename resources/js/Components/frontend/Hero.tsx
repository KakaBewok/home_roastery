import { Banner } from "@/types/frontend/banner";
import imageNotFound from "../../../../public/images/image-not-found.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const Hero = ({ banners }: { banners: Banner[] }) => {
    const slideImages: string[] =
        banners.length < 1 || banners == null
            ? [imageNotFound]
            : banners.map((banner) => banner.banner_url);

    return (
        <div className="py-5">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                className="w-full rounded-none lg:rounded-sm md:h-72 lg:h-96"
            >
                {slideImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`${
                                import.meta.env.VITE_APP_URL
                            }/storage/${image}`}
                            alt={`Banner ${index + 1}`}
                            className="object-cover w-full h-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
