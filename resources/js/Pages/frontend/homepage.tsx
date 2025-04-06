import ProductsListing from "@/Components/frontend/ProductsListing";
import { Product } from "@/types/frontend/product";
import { Head } from "@inertiajs/react";
import Nav from "@/Components/frontend/Nav";
import Footer from "@/Components/frontend/Footer";
import { Hero } from "@/Components/frontend/Hero";
import { Banner } from "@/types/frontend/banner";
import { Category } from "@/types/frontend/category";
import Loading from "@/Components/frontend/Loading";

interface HomePageProps {
    categories: Category[];
    banners: Banner[];
    products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({
    categories,
    banners,
    products,
}) => {
    return (
        <div className="max-w-6xl mx-auto">
            <Head title="Home" />
            <Loading />
            <Nav />
            <Hero banners={banners} />
            <ProductsListing categories={categories} products={products} />
            <Footer />
        </div>
    );
};

export default HomePage;
