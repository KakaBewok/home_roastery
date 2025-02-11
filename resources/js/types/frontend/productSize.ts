import { ProductVariant } from "./productVariant";

export interface ProductSize {
    id: number;
    product_id: number;
    size: string;
    variants: ProductVariant[];
}
