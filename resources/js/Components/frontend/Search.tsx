type SearchProps = {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    className?: string;
};

export const Search: React.FC<SearchProps> = ({
    searchTerm,
    setSearchTerm,
    className,
}) => {
    return (
        <label
            className={`${className} items-center gap-1 px-3 bg-white  input input-bordered`}
        >
            <input
                type="text"
                className="w-[140px] md:w-[200px] border-none outline-none focus:outline-none focus:ring-0 text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
            >
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                />
            </svg>
        </label>
    );
};
