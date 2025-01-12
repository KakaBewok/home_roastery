import ProductCard from "./ProductCard";
import { Category } from "@/types/frontend/category";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Loading from "./Loading";

function ProductListings({ categories }: { categories: Category[] }) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
            {categories == null || categories.length < 1 ? (
                <div className="flex items-center justify-center h-40">
                    <p className="text-lg text-gray-800">No category found!</p>
                </div>
            ) : (
                categories.map((category: Category) => {
                    const isExpanded = expandedCategories.includes(category.id);

                    return (
                        <div key={category.id} className="mb-11">
                            <div className="flex items-center justify-between px-3 mb-4">
                                <h2 className="mb-4 text-lg font-bold text-orange-600 lg:text-2xl">
                                    {category.name}
                                </h2>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => toggleViewAll(category.id)}
                                    className={`${
                                        isExpanded
                                            ? "bg-orange-600 text-orange-100 hover:bg-orange-600 hover:text-orange-200"
                                            : "text-orange-600 bg-orange-100 hover:bg-orange-200 hover:text-orange-600"
                                    } px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm font-medium rounded`}
                                >
                                    {isExpanded ? "Show Less" : "View All"}
                                </Button>
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
                                        ? category.products
                                        : category.products.slice(0, 4)
                                    ).map((product, index) => (
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

export default ProductListings;
