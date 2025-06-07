import React from 'react'
import { Loader2 } from 'lucide-react'
import {User} from "@/types/user";
import {SearchResultItem} from "@/features/projects/components/forms/team_selection/SearchResultItem";

interface SearchResultsDropdownProps {
    isVisible: boolean
    searchTerm: string
    isLoading: boolean
    error: string | null
    results: User[]
    selectedIds: number[]
    onSelectTeammate: (teammate: User) => void
}

export const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
                                                                                isVisible,
                                                                                searchTerm,
                                                                                isLoading,
                                                                                error,
                                                                                results,
                                                                                selectedIds,
                                                                                onSelectTeammate
                                                                            }) => {
    if (!isVisible || !searchTerm) return null
    return (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoading && (
                <div className="p-4 text-center text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                    Searching...
                </div>
            )}
            {error && (
                <div className="p-4 text-center text-red-500 text-sm">
                    {error}
                </div>
            )}

            {!isLoading && !error && results.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                    No teammates found
                </div>
            )}
            {results.map((teammate) => (
                <SearchResultItem
                    key={teammate.userId}
                    teammate={teammate}
                    isSelected={selectedIds.includes(Number(teammate.userId))}
                    onSelect={() => onSelectTeammate(teammate)}
                />
            ))}
        </div>
    )
}
