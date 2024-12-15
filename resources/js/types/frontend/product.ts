import { Category } from "./category";
import { Photo } from "./photo";

export interface Product {
    id: string;
    category: Category;
    name: string;
    description: string;
    price: number;
    unit: string;
    stock: number;
    photos?: Photo[];
}
