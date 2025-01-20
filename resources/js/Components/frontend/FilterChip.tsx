import { Category } from "@/types/frontend/category";
import { Button } from "../ui/button";

type FilterChipProps = {
    label: string;
    selected?: boolean;
    onSelect: (label: string) => void;
};

const FilterChip: React.FC<FilterChipProps> = ({
    label,
    selected = false,
    onSelect,
}) => {
    return (
        <div
            className={`text-center flex items-center px-2 py-1 rounded-full border cursor-pointer transition-all ${
                selected
                    ? "bg-orange-600 text-orange-100"
                    : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onSelect && onSelect(label)}
        >
            <p className="text-xs font-medium md:text-sm ">{label}</p>
        </div>
    );
};

export default FilterChip;
