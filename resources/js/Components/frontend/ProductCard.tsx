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
            <div className="mx-auto rounded shadow-md h-120 w-80">
                <div className="relative">
                    <img
                        src={productImage}
                        alt={productImage}
                        className="w-full duration-300 ease-in-out transform rounded-t-md hover:scale-105"
                    />
                </div>
                <div className="relative h-48">
                    <div className="px-6 pt-4 text-2xl font-semibold text-orange-400 font-primary">
                        {name}
                    </div>
                    <div className="px-6 pt-2 font-light text-gray-500 text-md font-primary line-clamp-2">
                        {description}
                    </div>
                    <div className="absolute bottom-0 right-0 py-2 pl-8 pr-4 mb-4 text-base font-medium text-orange-500 bg-orange-100 rounded-tl-sm font-primary triangle">
                        <Price
                            currency="Rp. "
                            nominal={price}
                            className="text-md"
                        />
                    </div>
                </div>
            </div>
        </a>
    );
}

export default ProductCard;
