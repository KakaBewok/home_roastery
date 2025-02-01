import Price from "../../Components/frontend/Price";
import { Product } from "@/types/frontend/product";
import imageNotFound from "../../../../public/images/image-not-found.jpg";
import { Star } from "lucide-react";

function ProductCard({ product }: { product: Product }) {
    const { name, photos, sizes, average_rating, total_stock } = product;

    const productImage =
        photos && photos.length > 0 ? photos[0].image_url : imageNotFound;

    const { price: startingPrice, original_price: lowestOriginalPrice } =
        sizes && sizes.length > 0
            ? sizes.reduce(
                  (min, size) => (size.price < min.price ? size : min),
                  sizes[0]
              )
            : { price: 0, original_price: 0 };

    const getJustifyClassForStockAndRating = () => {
        if (roundedRating < 2) return "justify-end";
        if (total_stock > 4) return "justify-start";
        return "justify-between";
    };

    const roundedRating = Math.ceil(average_rating || 0);

    return (
        <a href="#" className="block overflow-hidden group">
            <div className="relative h-[300px] sm:h-[350px]">
                <img
                    src={`${
                        import.meta.env.VITE_APP_URL
                    }/storage/${productImage}`}
                    alt="Product photo"
                    className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 rounded-lg opacity-100 group-hover:opacity-85"
                />
            </div>

            <div className="relative pt-3 bg-white">
                <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4 line-clamp-2">
                    {name}
                </h3>
                <div className="mt-1.5 flex flex-col md:flex-row items-start md:items-center justify-between text-gray-900">
                    <div className="flex items-center justify-between gap-2 md:gap-1">
                        <Price
                            currency="Rp. "
                            nominal={startingPrice}
                            className="text-sm font-medium tracking-wide md:text-base"
                        />
                        {lowestOriginalPrice > 0 && (
                            <div className="flex items-center">
                                <del className="text-gray-500 opacity-60">
                                    <Price
                                        currency="Rp. "
                                        nominal={lowestOriginalPrice}
                                        className="text-xs tracking-normal md:text-sm"
                                    />
                                </del>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={`flex items-center mt-1 ${getJustifyClassForStockAndRating()}`}
                >
                    {roundedRating > 2 && (
                        <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={
                                        i < roundedRating
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>
                    )}
                    {total_stock > 0 && total_stock < 4 && (
                        <p className="px-3 py-1 text-sm font-medium tracking-wide text-white bg-red-600 shadow-sm blinking-text md:text-base">
                            {total_stock} Left
                        </p>
                    )}
                </div>
            </div>
        </a>

        // <a href={`/products/${id}`}>
        //     <div className="p-1 md:p-2 border-b-[1px] rounded-sm hover:opacity hover:opacity-70 transition duration-400">
        //         <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm shadow-sm">
        //             <img
        //                 src={`${
        //                     import.meta.env.VITE_APP_URL
        //                 }/storage/${productImage}`}
        //                 alt="Product photo"
        //                 className="object-cover w-full h-full"
        //             />
        //         </div>
        //         <div className="py-2 space-y-3 md:space-y-3 md:py-3">
        //             <h1 className="text-sm font-semibold leading-snug text-orange-600 md:text-lg line-clamp-1">
        //                 {name}
        //             </h1>
        //             <p className="text-xs font-light text-slate-500 line-clamp-2 min-h-8">
        //                 {description}
        //             </p>
        //             <div className="flex items-center justify-between">
        //                 <Button
        //                     className="px-2 py-1 text-xs border md:px-3 rounded-3xl border-slate-800"
        //                     variant="outline"
        //                     size="sm"
        //                 >
        //                     Add to cart
        //                 </Button>
        //                 <Price
        //                     currency="Rp. "
        //                     nominal={price}
        //                     className="text-xs font-semibold text-orange-600 md:text-lg"
        //                 />
        //             </div>
        //         </div>
        //     </div>
        // </a>
    );
}

export default ProductCard;
