import { Category } from "./category";
import { Photo } from "./photo";
import { ProductSize } from "./productSize";

// export interface Product {
//     id: string;
//     category: Category;
//     name: string;
//     description: string;
//     price: number;
//     unit: string;
//     stock: number;
//     photos?: Photo[];
//     sizes?: ProductSize[];
// }

export interface Product {
    id: string;
    category: Category;
    name: string;
    description: string;
    photos: Photo[];
    sizes: ProductSize[];
    average_rating: number; // Menyimpan nilai rating rata-rata
    starting_price: number; // Harga termurah berdasarkan ukuran produk
    total_stock: number; // Total stok dari semua ukuran produk
    is_out_of_stock: boolean; // Menandakan apakah produk kehabisan stok
}
