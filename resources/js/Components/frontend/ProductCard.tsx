import Price from "../../Components/frontend/Price";
import { Product } from "@/types/frontend/product";

function ProductCard({ product }: { product: Product }) {
    const { id, category, name, description, price, unit, stock, photos } =
        product;
    const productImage =
        product?.photos && product.photos.length > 0
            ? product.photos[0].image_url
            : ""; // kasih alt, jika tidak ada foto product

    return (
        <a href={`/products/${id}`}>
            {/* <div className="rounded shadow-md h-120 w-80 "> */}
            <div className="rounded shadow-md">
                <div className="p-2">
                    <img
                        src={productImage}
                        alt={productImage}
                        className="object-cover duration-300 ease-in-out transform rounded-t-md hover:scale-105"
                    />
                </div>
                <div className="relative h-36 md:h-48">
                    <h1 className="px-2 pt-2 text-lg font-semibold leading-tight text-orange-400 md:pt-4 md:px-6 md:text-2xl line-clamp-1 md:line-clamp-none">
                        {name}
                    </h1>
                    <p className="px-2 pt-2 text-xs font-light text-gray-500 md:px-6 md:text-md font-primary line-clamp-2">
                        {description}
                    </p>
                    <div className="absolute bottom-0 right-0 py-1 pl-6 pr-2 mb-4 font-semibold text-orange-500 bg-orange-100 rounded-tl-sm md:pr-4 md:pl-8 md:py-2 triangle">
                        <Price
                            currency="Rp. "
                            nominal={price}
                            className="text-sm md:text-md"
                        />
                    </div>
                </div>
            </div>
        </a>
    );
}

export default ProductCard;
