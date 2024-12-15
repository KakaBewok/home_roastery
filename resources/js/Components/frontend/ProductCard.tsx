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
            <a className="mx-auto border rounded shadow-lg h-120 w-72 border-palette-lighter">
                <div className="relative border-b-2 h-72 border-palette-lighter">
                    <img
                        src={productImage}
                        alt={productImage}
                        className="duration-500 ease-in-out transform hover:scale-110"
                    />
                </div>
                <div className="relative h-48">
                    <div className="px-4 pt-4 text-2xl font-semibold font-primary text-palette-primary">
                        {name}
                    </div>
                    <div className="p-4 text-lg font-light text-gray-600 font-primary">
                        {description}
                    </div>
                    <div className="absolute bottom-0 right-0 pt-2 pb-1 pl-8 pr-4 mb-4 text-base font-medium rounded-tl-sm text-palette-dark font-primary bg-palette-lighter triangle">
                        <Price
                            currency="Rp. "
                            nominal={price}
                            className="text-lg"
                        />
                    </div>
                </div>
            </a>
        </a>
    );
}

export default ProductCard;
