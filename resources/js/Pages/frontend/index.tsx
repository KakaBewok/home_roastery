import ProductsListing from "../../Components/frontend/ProductsListing";
import { Product } from "@/types/frontend/product";
import { Head } from "@inertiajs/react";
import Nav from "@/Components/frontend/Nav";
import Footer from "@/Components/frontend/Footer";
import { Hero } from "@/Components/frontend/Hero";
import { Banner } from "@/types/frontend/banner";
import { Category } from "@/types/frontend/category";

function IndexPage({
    categories,
    banners,
    products,
}: {
    categories: Category[];
    banners: Banner[];
    products: Product[];
}) {
    return (
        <div className="max-w-6xl mx-auto">
            <Head title="Home" />
            <Nav />
            <Hero banners={banners} />
            <ProductsListing categories={categories} products={products} />
            <Footer />
        </div>
    );
}

export default IndexPage;
