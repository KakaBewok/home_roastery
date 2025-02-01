import ProductCard from "./ProductCard";
import { Category } from "@/types/frontend/category";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Loading from "./Loading";
import FilterChip from "./FilterChip";
import { Product } from "@/types/frontend/product";
import { SearchContext } from "@/context/SearchContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { groupBy } from "lodash";
import { Filter } from "./Filter";

type ProductsListingProps = {
    categories: Category[];
    products: Product[];
};

const ProductsListing: React.FC<ProductsListingProps> = ({
    categories,
    products,
}) => {
    // states
    const { searchTerm } = useContext(SearchContext) || { searchTerm: "" };
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
        const priceA = a.sizes
            ? Math.min(...a.sizes.map((size) => size.price))
            : a.starting_price;
        const priceB = b.sizes
            ? Math.min(...b.sizes.map((size) => size.price))
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
                <div className="flex w-full gap-2 overflow-x-auto border border-red-500 md:hidden scrollbar-hide">
                    {categories.map((category) => (
                        <FilterChip
                            key={category.id}
                            label={category.name}
                            selected={activeFilters.includes(category.name)}
                            onSelect={handleSelectFilter}
                        />
                    ))}
                </div>
                <div className="flex gap-3 border border-red-500">
                    <Filter
                        categories={categories}
                        selectedCategories={activeFilters}
                        onSelect={setActiveFilters}
                    />
                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="w-[180px] rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        onChange={(event) => setSortBy(event.target.value)}
                    >
                        <option>Sort products</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>
            <h2 className="px-3 mb-12 text-2xl font-semibold text-left text-gray-800 md:text-3xl">
                Every Bean Tells a Story ☕
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
                                    <div className="flex items-center justify-center px-4 py-2 bg-orange-100 rounded-sm">
                                        <h2 className="text-lg font-bold text-orange-600">
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
                                                    ? "bg-orange-500 text-orange-100 hover:bg-orange-600 hover:text-orange-200"
                                                    : "text-orange-500 bg-orange-100 hover:bg-orange-200 hover:text-orange-600"
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
