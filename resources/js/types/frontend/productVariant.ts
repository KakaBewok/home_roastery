export interface ProductVariant {
    id: string;
    product_id: string;
    size: string;
    type: string;
    color?: string;
    price: number;
    original_price: number;
    stock: number;
}
