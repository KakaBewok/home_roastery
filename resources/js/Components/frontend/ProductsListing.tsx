import ProductCard from "./ProductCard";
import { Category } from "@/types/frontend/category";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Loading from "./Loading";
import FilterChip from "./FilterChip";
import { Product } from "@/types/frontend/product";
import { groupBy } from "lodash";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { Sort } from "./Sort";

type ProductsListingProps = {
    categories: Category[];
    products: Product[];
};

const ProductsListing: React.FC<ProductsListingProps> = ({
    categories,
    products,
}) => {
    // states
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>("");

    // methods
    const handleSelectFilter = (category: string) => {
        if (!activeFilters.includes(category)) {
            setActiveFilters([...activeFilters, category]);
        } else {
            setActiveFilters(
                activeFilters.filter((filter) => filter !== category)
            );
        }
    };
    const toggleViewAll = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    // filters & sorting
    const filteredItems = products.filter((product) =>
        activeFilters.length > 0
            ? activeFilters.includes(product.category.name)
            : true
    );
    const searchItems = filteredItems.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedProducts = searchItems.sort((a, b) => {
        const priceA = a.variants
            ? Math.min(...a.variants.map((variant) => variant.price))
            : a.starting_price;
        const priceB = b.variants
            ? Math.min(...b.variants.map((variant) => variant.price))
            : b.starting_price;

        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        return priceA - priceB; // Default sorting by price if none specified
    });
    const groupedProducts = groupBy(
        sortedProducts,
        (product: Product) => product.category.id
    );

    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
        }
    }, [products]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-80">
                <Loading />
            </div>
        );
    }

    return (
        <div className="container w-full py-8 mx-auto">
            <div className="flex flex-col items-start justify-between w-full gap-5 px-3 md:items-center md:flex-row mb-14">
                {/* filter chips mobile*/}
                <div className="flex w-full gap-2 overflow-x-auto md:hidden scrollbar-hide">
                    {categories.map((category) => (
                        <FilterChip
                            key={category.id}
                            label={category.name}
                            selected={activeFilters.includes(category.name)}
                            onSelect={handleSelectFilter}
                        />
                    ))}
                </div>
                <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    className={"hidden md:flex"}
                />
                <div className="flex justify-between w-full gap-3 md:w-auto">
                    <Filter
                        categories={categories}
                        selectedCategories={activeFilters}
                        onSelect={setActiveFilters}
                        className="hidden md:flex"
                    />
                    <Sort sortBy={sortBy} setSortBy={setSortBy} />
                    {/* search box mobile*/}
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        className={"md:hidden flex"}
                    />
                </div>
            </div>
            <h2 className="px-3 text-xl font-semibold text-left text-gray-800 mb-7 md:mb-12 md:text-2xl">
                Your Coffee Journey Starts Here ☕
            </h2>

            {sortedProducts == null || sortedProducts.length < 1 ? (
                <div className="flex items-center justify-center h-40">
                    <p className="text-lg text-gray-800">No product found!</p>
                </div>
            ) : activeFilters == null || activeFilters.length < 1 ? (
                // show all products, if filters empty
                <div className="grid grid-cols-2 gap-3 px-3 md:px-5 lg:px-0 md:gap-4 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {sortedProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            ) : (
                Object.entries(groupedProducts).map(
                    ([categoryId, productsInCategory]) => {
                        const products = productsInCategory as Product[];
                        const category = products[0].category;
                        const isExpanded =
                            expandedCategories.includes(categoryId);

                        return (
                            <div key={categoryId} className="mb-11">
                                <div className="flex items-center justify-between px-4 mb-4 md:px-7 lg:px-2">
                                    <div className="flex items-center justify-center px-4 py-2 rounded-sm bg-slate-100">
                                        <h2 className="text-lg font-bold md:text-xl text-slate-700">
                                            {category.name}
                                        </h2>
                                    </div>
                                    {products.length > 4 && (
                                        <Button
                                            size="sm"
                                            variant={"ghost"}
                                            onClick={() =>
                                                toggleViewAll(categoryId)
                                            }
                                            className={`${
                                                isExpanded
                                                    ? "bg-slate-700 text-slate-100 hover:bg-slate-800 hover:text-slate-200"
                                                    : "text-slate-700 bg-slate-200 hover:bg-slate-300 hover:text-slate-800"
                                            } px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm font-medium rounded-badge`}
                                        >
                                            {isExpanded
                                                ? "Show Less"
                                                : "View All"}
                                        </Button>
                                    )}
                                </div>

                                {/* Products list */}
                                <div className="grid grid-cols-2 gap-3 px-3 md:px-5 lg:px-0 md:gap-4 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
                                    {(isExpanded
                                        ? products
                                        : products.slice(0, 4)
                                    ).map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    }
                )
            )}
        </div>
    );
};

export default ProductsListing;
