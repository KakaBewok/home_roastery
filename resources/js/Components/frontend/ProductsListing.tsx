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

function ProductsListing({
    categories,
    products,
}: {
    categories: Category[];
    products: Product[];
}) {
    const { searchTerm } = useContext(SearchContext) || { searchTerm: "" };
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>("");
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

    // filters and search products
    const filteredItems = categories.filter((category) =>
        activeFilters.includes(category.name)
    );
    const searchItems = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedProducts = searchItems.sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name); // Sort nama A-Z
        if (sortBy === "name-desc") return b.name.localeCompare(a.name); // Sort nama Z-A
        if (sortBy === "price-asc") return a.price - b.price; // Sort harga rendah ke tinggi
        if (sortBy === "price-desc") return b.price - a.price; // Sort harga tinggi ke rendah
        return a.price - b.price;
    });

    // Tahap 1: Filter berdasarkan chip
    // const filteredItems = products.filter((product) =>
    //     activeFilters.length > 0
    //         ? activeFilters.includes(product.category)
    //         : true
    // );

    // Tahap 2: Filter berdasarkan pencarian
    // const searchItems = filteredItems.filter((product) =>
    //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // Tahap 3: Sort berdasarkan pilihan
    // const sortedProducts = searchItems.sort((a, b) => {
    //     if (sortBy === "name-asc") return a.name.localeCompare(b.name); // Sort nama A-Z
    //     if (sortBy === "name-desc") return b.name.localeCompare(a.name); // Sort nama Z-A
    //     if (sortBy === "price-asc") return a.price - b.price; // Sort harga rendah ke tinggi
    //     if (sortBy === "price-desc") return b.price - a.price; // Sort harga tinggi ke rendah
    //     return 0; // Default: Tidak ada pengurutan
    // });

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
            <div className="flex items-center justify-between w-full px-3 mb-14">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                        <FilterChip
                            key={category.id}
                            label={category.name}
                            selected={activeFilters.includes(category.name)}
                            onSelect={handleSelectFilter}
                        />
                    ))}
                </div>
                <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="price-asc">
                            Price (Low to High)
                        </SelectItem>
                        <SelectItem value="price-desc">
                            Price (High to Low)
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {categories == null || categories.length < 1 ? (
                <div className="flex items-center justify-center h-40">
                    <p className="text-lg text-gray-800">No product found!</p>
                </div>
            ) : filteredItems == null || filteredItems.length < 1 ? (
                // show all products, if filters empty
                <div className="grid grid-cols-2 gap-3 px-3 md:px-5 lg:px-0 md:gap-4 lg:gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {sortedProducts == null || sortedProducts.length < 1 ? (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-lg text-gray-800">
                                No product found!
                            </p>
                        </div>
                    ) : (
                        sortedProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    )}
                </div>
            ) : (
                filteredItems.map((category: Category) => {
                    const isExpanded = expandedCategories.includes(category.id);

                    return (
                        <div key={category.id} className="mb-11">
                            <div className="flex items-center justify-between px-3 mb-4">
                                <div className="flex items-center justify-center px-4 py-2 mb-4 bg-orange-100 rounded-badge">
                                    <h2 className="text-lg font-bold text-orange-600 lg:text-xl">
                                        {category.name}
                                    </h2>
                                </div>
                                {
                                    // show view all button if products are more than 10
                                    category.products.length > 10 && (
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
                                        : [...category.products.slice(0, 10)]
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
