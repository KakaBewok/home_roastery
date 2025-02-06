import { Category } from "./category";
import { Photo } from "./photo";
import { ProductVariant } from "./productVariant";

export interface Product {
    id: string;
    category: Category;
    name: string;
    description: string;
    photos: Photo[];
    variants: ProductVariant[];
    average_rating: number;
    starting_price: number;
    total_stock: number;
    is_out_of_stock: boolean;
    is_publish: boolean;
}
