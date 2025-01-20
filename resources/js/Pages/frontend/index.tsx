import ProductsListing from "../../Components/frontend/ProductsListing";
import { Product } from "@/types/frontend/product";
import { Head } from "@inertiajs/react";
import Nav from "@/Components/frontend/Nav";
import Footer from "@/Components/frontend/Footer";
import { Hero } from "@/Components/frontend/Hero";
import { Banner } from "@/types/frontend/banner";
import { Category } from "@/types/frontend/category";
import { SearchProvider } from "@/context/SearchContext";

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
        <SearchProvider>
            <div className="max-w-6xl mx-auto">
                <Head title="Home" />
                <Nav />
                <Hero banners={banners} />
                <ProductsListing categories={categories} products={products} />
                <Footer />
            </div>
        </SearchProvider>
    );
}

export default IndexPage;
