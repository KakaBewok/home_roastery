import StoreHeading from "../../Components/frontend/StoreHeading";
import ProductListings from "../../Components/frontend/ProductListings";
import { Product } from "@/types/frontend/product";

const dummyProducts: Product[] = [
    {
        id: "001",
        category: {
            name: "Arabica",
            description: "",
        },
        name: "Home Roastery Special",
        description: "",
        price: 25000,
        unit: "Pcs",
        stock: 15,
        photos: undefined,
    },
    {
        id: "002",
        category: {
            name: "Robusta",
            description: "Test",
        },
        name: "Home Roastery Biasa",
        description: "",
        price: 15000,
        unit: "Pcs",
        stock: 11,
        photos: undefined,
    },
];

function IndexPage({ products }: { products: Product[] }) {
    return (
        <div className="max-w-6xl mx-auto">
            <StoreHeading />
            <ProductListings products={dummyProducts} />
        </div>
    );
}

export default IndexPage;
