type SortProps = {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
};

export const Sort: React.FC<SortProps> = ({ sortBy, setSortBy }) => {
    return (
        <select
            name="HeadlineAct"
            id="HeadlineAct"
            className={`w-[160px] rounded-lg border-slate-100 text-gray-700 text-sm ${
                sortBy !== "" &&
                sortBy !== "Sort by" &&
                "bg-slate-800 text-white"
            }`}
            onChange={(event) => setSortBy(event.target.value)}
        >
            <option>Sort by</option>
            <option value="name-asc">Name - Asc</option>
            <option value="name-desc">Name - Desc</option>
            <option value="price-asc">Price - Asc</option>
            <option value="price-desc">Price - Desc</option>
        </select>
    );
};
