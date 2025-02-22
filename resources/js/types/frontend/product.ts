import { Category } from "./category";
import { Photo } from "./photo";
import { ProductSize } from "./productSize";
import { ProductVariant } from "./productVariant";
import { Review } from "./Review";

export interface Product {
    id: string;
    category: Category;
    name: string;
    description: string;
    photos: Photo[];
    sizes: ProductSize[];
    reviews: Review[];
    is_publish: boolean;
    average_rating: number;
    starting_price: number;
    total_stock: number;
    is_out_of_stock: boolean;
    available_sizes: string[];
    available_types: string[];
    displayed_product_data: DisplayedProductData;
}
