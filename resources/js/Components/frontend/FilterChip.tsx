import { Category } from "@/types/frontend/category";
import { Button } from "../ui/button";

// export const Categories = ({ categories }: { categories: Category[] }) => {
//     return (
//         <div>
//             <div>
//                 {categories != null && categories.length > 0 ? (
//                     <div className="flex w-full gap-2 px-2 py-2 my-5 overflow-x-auto scroll-smooth">
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge active:bg-orange-600"
//                         >
//                             Category one
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category two
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category tree
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category four
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category five
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category six
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category seven
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category four
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category five
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category six
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category seven
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category four
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category five
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category six
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="rounded-badge"
//                         >
//                             Category seven
//                         </Button>
//                     </div>
//                 ) : (
//                     <div className="w-full py-3 text-center">
//                         <p className="font-medium text-md">
//                             No category found!
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

type FilterChipProps = {
    label: string; // Text label for the chip
    selected?: boolean; // Whether the chip is selected
    onSelect?: (label: string) => void; // Callback when the chip is selected
    onRemove?: (label: string) => void; // Callback when the chip is removed
};

const FilterChip: React.FC<FilterChipProps> = ({
    label,
    selected = false,
    onSelect,
    onRemove,
}) => {
    return (
        <div
            className={`flex items-center px-3 py-1 rounded-full border cursor-pointer transition-all ${
                selected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onSelect && onSelect(label)}
        >
            <span className="mr-2 text-sm font-medium">{label}</span>
            {onRemove && (
                <button
                    className="text-sm bg-transparent border-none cursor-pointer focus:outline-none"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the onSelect callback
                        onRemove(label);
                    }}
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default FilterChip;
