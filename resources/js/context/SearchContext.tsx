import React, { createContext, useState } from "react";

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(
    undefined
);

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
}
