import { Banner } from "@/types/frontend/banner";
import { useEffect, useState } from "react";
import imageNotFound from "../../../../public/images/image-not-found.jpg";

export const Hero = ({ banners }: { banners: Banner[] }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const totalSlides: number = banners == null ? 0 : banners.length;

    const slideImages: string[] =
        banners.length < 1 || banners == null
            ? [imageNotFound]
            : banners.map((banner) => banner.banner_url);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Function to navigate to previous and next slides
    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
        );
    };
    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    return (
        <div className="relative px-3 py-5 lg:px-0 group">
            <div className="w-full overflow-hidden rounded-lg">
                {/* Wrapper for sliding */}
                <div
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {slideImages.map((image, index) => (
                        <div
                            key={`slide${index}`}
                            className="flex-shrink-0 w-full"
                        >
                            <img
                                src={`${
                                    import.meta.env.VITE_APP_URL
                                }/storage/${image}`}
                                className="object-cover w-full h-64"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Manual navigation buttons */}
            <div
                className={`${
                    totalSlides == 1 ? "hidden" : ""
                } absolute flex justify-between transition-opacity duration-300 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 left-5 right-5 top-1/2`}
            >
                <a
                    className="text-slate-300 btn btn-circle btn-xs"
                    onClick={goToPreviousSlide}
                >
                    ❮
                </a>
                <a className="btn btn-circle btn-xs" onClick={goToNextSlide}>
                    ❯
                </a>
            </div>

            {/* Slide indicators */}
            <div
                className={`${
                    totalSlides == 1 ? "hidden" : ""
                } flex justify-center mt-2 space-x-2 md:mt-4`}
            >
                {slideImages.map((_, index) => (
                    <button
                        key={index}
                        className={`w-1 h-1 md:w-2 md:h-2 rounded-full ${
                            index === currentSlide
                                ? "bg-orange-500"
                                : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};
