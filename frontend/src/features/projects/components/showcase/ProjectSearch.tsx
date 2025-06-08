"use client"
import React , {useEffect , useState} from "react";
import {SearchInput} from "@/features/projects/components/forms/tech_selection/SearchInput";
import {useUrlFilters} from "@/hooks/useUpdateFilter";
import {useDebounce} from "@/hooks/useDebounce";



export function ProjectSearch() {
    const {getFilter, updateFilter} = useUrlFilters();
    const [searchTerm, setSearchTerm] = useState(getFilter('search'));
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    useEffect(() => {
         updateFilter('search', searchTerm)
        }, [debouncedSearchTerm])
    return(
        <div className="w-full flex-1">
            <SearchInput
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                onClear={() => setSearchTerm('')}
            />
        </div>
    )
}
