import { Category } from "@/types/frontend/category";

type FilterProps = {
    categories: Category[];
    selectedCategories: string[];
    onSelect: (selected: string[]) => void;
    className?: string;
};

export const Filter: React.FC<FilterProps> = ({
    categories,
    selectedCategories,
    onSelect,
    className,
}) => {
    const handleCategoryChange = (categoryName: string) => {
        let updatedSelection;

        if (selectedCategories.includes(categoryName)) {
            updatedSelection = selectedCategories.filter(
                (name) => name !== categoryName
            );
        } else {
            updatedSelection = [...selectedCategories, categoryName];
        }

        onSelect(updatedSelection);
    };
    const isFilterActive = selectedCategories.length > 0;

    return (
        <div
            className={`${className} ${
                isFilterActive && "bg-slate-800"
            } relative px-4 py-2 border rounded-lg border-slate-100`}
        >
            <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                    className={`flex items-center gap-2 transition cursor-pointer ${
                        isFilterActive ? "text-white" : "text-slate-700"
                    } hover:border-gray-600`}
                >
                    <span className="text-sm font-normal">
                        Filter by Category
                    </span>

                    <span className="transition group-open:-rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </span>
                </summary>

                <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-4">
                    <div
                        className={`${
                            isFilterActive ? "bg-slate-800" : "bg-white"
                        } w-48 border border-gray-200 rounded-sm`}
                    >
                        <ul className="p-4 space-y-1 border-t border-gray-200">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <label
                                        htmlFor={`FilterCategory${category.id}`}
                                        className="inline-flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`FilterCategory${category.id}`}
                                            className="border-gray-300 rounded-sm size-5"
                                            checked={selectedCategories.includes(
                                                category.name
                                            )}
                                            onChange={() =>
                                                handleCategoryChange(
                                                    category.name
                                                )
                                            }
                                        />
                                        <span
                                            className={`text-sm font-normal text-gray-700 ${
                                                isFilterActive && "text-white"
                                            }`}
                                        >
                                            {category.name}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </details>
        </div>
    );
};
