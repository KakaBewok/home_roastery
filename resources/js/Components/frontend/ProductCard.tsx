import Price from "../../Components/frontend/Price";
import { Product } from "@/types/frontend/product";
import imageNotFound from "../../../../public/images/image-not-found.jpg";
import { Star } from "lucide-react";
import { ProductVariant } from "@/types/frontend/productVariant";
import { Link } from "@inertiajs/react";

function ProductCard({ product }: { product: Product }) {
    const { name, photos, variants, average_rating, total_stock } = product;
    const roundedRating = Math.ceil(average_rating || 0);
    const productImage =
        photos && photos.length > 0 ? photos[0].image_url : imageNotFound;
    const formattedVariants =
        variants && variants.length > 0
            ? variants.map((v) => ({
                  ...v,
                  original_price: Number(v.original_price),
                  price: Number(v.price),
              }))
            : variants;

    const getJustifyClassForStockAndRating = () => {
        if (roundedRating < 2) return "justify-end";
        if (total_stock > 4) return "justify-start";
        return "justify-between";
    };
    const filterVariants = (variants: ProductVariant[]) => {
        if (!variants || variants.length === 0)
            return { price: 0, original_price: 0 };

        const discountedVariants = variants.filter(
            (variant) => variant.original_price > variant.price
        );

        return discountedVariants.length > 0
            ? discountedVariants.reduce(
                  (maxDiscount, current) =>
                      current.original_price - current.price >
                      maxDiscount.original_price - maxDiscount.price
                          ? current
                          : maxDiscount,
                  discountedVariants[0]
              )
            : variants.reduce(
                  (min, current) => (current.price < min.price ? current : min),
                  variants[0]
              );
    };
    const { price: startingPrice, original_price: lowestOriginalPrice } =
        filterVariants(formattedVariants);

    return (
        <Link
            href={route("product.show", product.id)}
            className="block overflow-hidden group"
        >
            <div className="relative h-[210px] md:h-[250px] lg:h-[280px]">
                {photos && photos.length > 0 ? (
                    <img
                        src={`${
                            import.meta.env.VITE_APP_URL
                        }/storage/${productImage}`}
                        alt="Product photo"
                        className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 rounded-sm opacity-100 group-hover:opacity-85"
                    />
                ) : (
                    <img
                        src={`${productImage}`}
                        alt="Product photo"
                        className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 rounded-sm opacity-100 group-hover:opacity-85"
                    />
                )}
                {lowestOriginalPrice > startingPrice &&
                    lowestOriginalPrice > 0 && (
                        <div className="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-tl-sm rounded-br-sm opacity-90 lg:text-sm">
                            -
                            {Math.round(
                                ((lowestOriginalPrice - startingPrice) /
                                    lowestOriginalPrice) *
                                    100
                            )}
                            %
                        </div>
                    )}
            </div>

            <div className="relative pt-3 bg-white">
                <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4 line-clamp-2">
                    {name}
                </h3>
                <div className="mt-[1px] md:mt-[2px] flex flex-col md:flex-row items-start md:items-center justify-between text-gray-900">
                    <div className="flex items-center justify-between gap-2 md:gap-1">
                        <Price
                            currency="Rp. "
                            nominal={startingPrice}
                            className="text-sm font-semibold tracking-wide md:text-base"
                        />
                        {lowestOriginalPrice > 0 && (
                            <>
                                <div className="flex items-center">
                                    <del className="text-gray-600 opacity-60">
                                        <Price
                                            currency="Rp. "
                                            nominal={lowestOriginalPrice}
                                            className="text-xs tracking-normal md:text-sm"
                                        />
                                    </del>
                                </div>
                            </>
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
                                            : "text-gray-200"
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
        </Link>
    );
}

export default ProductCard;
