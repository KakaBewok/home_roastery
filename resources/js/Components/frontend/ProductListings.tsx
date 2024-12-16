import { Product } from "@/types/frontend/product";
import ProductCard from "./ProductCard";

function ProductListings({ products }: { products: Product[] }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-10 py-14">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
}

export default ProductListings;
