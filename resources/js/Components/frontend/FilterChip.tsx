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
            className={`px-3 py-2 md:px-4 md:py-2 rounded-full cursor-pointer transition-all shrink-0 ${
                selected
                    ? "bg-slate-800 text-slate-50"
                    : "bg-slate-300 text-slate-800"
            }`}
            onClick={() => onSelect && onSelect(label)}
        >
            <p className="text-xs font-medium md:text-sm">{label}</p>
        </div>
    );
};

export default FilterChip;
