import Price from "../../Components/frontend/Price";
import { Product } from "@/types/frontend/product";
import { Button } from "../ui/button";
import imageNotFount from "../../../../public/images/image-not-found.jpg";

function ProductCard({ product }: { product: Product }) {
    const { id, category, name, description, price, unit, stock, photos } =
        product;
    const productImage =
        product?.photos && product.photos.length > 0
            ? product.photos[0].image_url
            : imageNotFount;

    return (
        <a href={`/products/${id}`}>
            <div className="p-1 md:p-2 border-b-[1px] rounded-sm hover:opacity hover:opacity-55 transition duration-400">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm shadow-sm">
                    <img
                        src={productImage}
                        alt="Product photo"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="py-2 space-y-2 md:space-y-2 md:py-3">
                    <h1 className="text-sm font-semibold leading-snug md:text-base text-slate-800 line-clamp-1">
                        {name}
                    </h1>
                    <p className="text-xs font-light text-slate-500 line-clamp-2">
                        {description}
                    </p>
                    <div className="flex items-center justify-between">
                        <Button
                            className="text-xs border rounded-3xl border-slate-800"
                            variant="outline"
                            size="sm"
                        >
                            Add to cart
                        </Button>
                        <Price
                            currency="Rp. "
                            nominal={price}
                            className="text-xs font-medium md:text-sm text-slate-800"
                        />
                    </div>
                </div>
            </div>
        </a>
    );
}

export default ProductCard;
