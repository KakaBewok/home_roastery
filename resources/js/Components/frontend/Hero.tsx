export const Hero = () => {
    return (
        <div className="px-3 py-5 lg:px-0">
            <div className="w-full rounded-lg carousel">
                <div
                    id="slide1"
                    className="relative w-full carousel-item group"
                >
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                        className="w-full"
                    />
                    <div className="absolute flex justify-between transition-opacity duration-300 transform -translate-y-1/2 md:opacity-0 left-5 right-5 top-1/2 opacity-95 md:group-hover:opacity-100">
                        <a
                            href="#slide4"
                            className="text-slate-300 btn btn-circle btn-xs"
                        >
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle btn-xs">
                            ❯
                        </a>
                    </div>
                </div>
                <div
                    id="slide2"
                    className="relative w-full carousel-item group"
                >
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                        className="w-full"
                    />
                    <div className="absolute flex justify-between transition-opacity duration-300 transform -translate-y-1/2 opacity-0 left-5 right-5 top-1/2 group-hover:opacity-100">
                        <a
                            href="#slide1"
                            className="text-slate-300 btn btn-circle btn-sm"
                        >
                            ❮
                        </a>
                        <a href="#slide3" className="btn btn-circle btn-sm">
                            ❯
                        </a>
                    </div>
                </div>
                <div
                    id="slide3"
                    className="relative w-full carousel-item group"
                >
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                        className="w-full"
                    />
                    <div className="absolute flex justify-between transition-opacity duration-300 transform -translate-y-1/2 opacity-0 left-5 right-5 top-1/2 group-hover:opacity-100">
                        <a
                            href="#slide2"
                            className="text-slate-300 btn btn-circle btn-sm"
                        >
                            ❮
                        </a>
                        <a href="#slide4" className="btn btn-circle btn-sm">
                            ❯
                        </a>
                    </div>
                </div>
                <div
                    id="slide4"
                    className="relative w-full carousel-item group"
                >
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                        className="w-full"
                    />
                    <div className="absolute flex justify-between transition-opacity duration-300 transform -translate-y-1/2 opacity-0 left-5 right-5 top-1/2 group-hover:opacity-100">
                        <a
                            href="#slide3"
                            className="text-slate-300 btn btn-circle btn-sm"
                        >
                            ❮
                        </a>
                        <a href="#slide1" className="btn btn-circle btn-sm">
                            ❯
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
