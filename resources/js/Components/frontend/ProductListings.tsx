import { Product } from "@/types/frontend/product";
import ProductCard from "./ProductCard";

function ProductListings({ products }: { products: Product[] }) {
    return (
        <div className="grid max-w-6xl grid-cols-1 py-12 mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
}

export default ProductListings;
