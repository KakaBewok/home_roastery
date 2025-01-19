import ProductCard from "./ProductCard";
import { Category } from "@/types/frontend/category";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Loading from "./Loading";
import FilterChip from "./FilterChip";

function ProductsListing({ categories }: { categories: Category[] }) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // --- //
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const handleSelectFilter = (category: string) => {
        if (!activeFilters.includes(category)) {
            setActiveFilters([...activeFilters, category]);
        }
    };
    const handleRemoveFilter = (category: string) => {
        setActiveFilters(activeFilters.filter((filter) => filter !== category));
    };

    const filteredProducts = activeFilters.length
        ? categories.filter((category) => activeFilters.includes(category.name))
        : categories;
    // --- //

    const toggleViewAll = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    useEffect(() => {
        if (categories.length > 0) {
            setLoading(false);
        }
    }, [categories]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-80">
                <Loading />
            </div>
        );
    }

    return (
        <div className="container py-8 mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                    <FilterChip
                        key={category.id}
                        label={category.name}
                        selected={activeFilters.includes(category.name)}
                        onSelect={handleSelectFilter}
                        onRemove={handleRemoveFilter}
                    />
                ))}
            </div>
            {categories == null || categories.length < 1 ? (
                <div className="flex items-center justify-center h-40">
                    <p className="text-lg text-gray-800">No category found!</p>
                </div>
            ) : (
                filteredProducts.map((category: Category) => {
                    const isExpanded = expandedCategories.includes(category.id);

                    return (
                        <div key={category.id} className="mb-11">
                            <div className="flex items-center justify-between px-3 mb-4">
                                <div className="flex items-center justify-center px-4 py-2 mb-4 bg-orange-100 rounded-badge">
                                    <h2 className="text-lg font-bold text-orange-600 lg:text-2xl">
                                        {category.name}
                                    </h2>
                                </div>
                                {
                                    // show view all button if products are more than 4
                                    category.products.length > 4 && (
                                        <Button
                                            variant={"ghost"}
                                            onClick={() =>
                                                toggleViewAll(category.id)
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
                                    )
                                }
                            </div>

                            {/* products list */}
                            <div className="grid grid-cols-2 gap-3 px-3 md:px-5 lg:px-0 md:gap-4 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
                                {category.products == null ||
                                category.products.length < 1 ? (
                                    <div className="flex items-center justify-center h-40">
                                        <p className="text-lg text-gray-800">
                                            No product found!
                                        </p>
                                    </div>
                                ) : (
                                    (isExpanded
                                        ? [...category.products]
                                        : [...category.products.slice(0, 4)]
                                    )
                                        .sort((a, b) => a.price - b.price)
                                        .map((product, index) => (
                                            <ProductCard
                                                key={index}
                                                product={product}
                                            />
                                        ))
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ProductsListing;
