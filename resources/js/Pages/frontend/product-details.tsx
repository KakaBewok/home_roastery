import Footer from "@/Components/frontend/Footer";
import Nav from "@/Components/frontend/Nav";
import { ProductDetails } from "@/Components/frontend/ProductDetails";
import { Product } from "@/types/frontend/product";
import { Head } from "@inertiajs/react";

const ProductDetailsPage = ({ product }: { product: Product }) => {
    return (
        <div className="max-w-6xl mx-auto">
            <Head title="Details" />
            <Nav />
            <ProductDetails product={product} />
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;
