import { Product } from "@/types/frontend/product";
import ProductCard from "./ProductCard";

function ProductListings({ products }: { products: Product[] }) {
    return (
        // <div className="flex flex-wrap items-center justify-center gap-10 py-14">
        <div className="grid grid-cols-2 gap-3 px-5 md:gap-7 place-items-center md:grid-cols-3 py-14">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
}

export default ProductListings;
