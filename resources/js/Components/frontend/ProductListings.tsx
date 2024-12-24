import { Product } from "@/types/frontend/product";
import ProductCard from "./ProductCard";

function ProductListings({ products }: { products: Product[] }) {
    return (
        <div className="py-14">
            {products == null || products.length < 1 ? (
                <div className="flex items-center justify-center h-40">
                    <p className="text-lg text-gray-800">No product found!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 px-3 md:px-5 lg:px-0 md:gap-4 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductListings;
