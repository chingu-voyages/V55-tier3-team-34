import React from "react";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Tag} from "@/features/projects/constants/project-data";
import {EmptySearchState} from "@/features/projects/components/forms/tech_selection/EmptySearchState";
import {TagGrid} from "@/features/projects/components/forms/tech_selection/TagGrid";

export const AvailableTechnologies: React.FC<{
    filteredTags: Tag[];
    selectedTagIds: number[];
    onToggle: (tagId: number) => void;
    searchTerm: string;
    showAllTags: boolean;
    totalTagsCount: number;
    onToggleShowAll: () => void;
}> = ({
          filteredTags,
          selectedTagIds,
          onToggle,
          searchTerm,
          showAllTags,
          totalTagsCount,
          onToggleShowAll
      }) => {
    const selectedFromFiltered = filteredTags.filter(tag => selectedTagIds.includes(tag.tagId));
    const unselectedFromFiltered = filteredTags.filter(tag => !selectedTagIds.includes(tag.tagId));

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">
                    {searchTerm
                        ? `Search Results (${filteredTags.length})`
                        : 'Available Technologies'
                    }
                </Label>
                {!searchTerm && filteredTags.length === 20 && totalTagsCount > 20 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onToggleShowAll}
                    >
                        {showAllTags ? 'Show Less' : `Show All (${totalTagsCount})`}
                    </Button>
                )}
            </div>

            {filteredTags.length === 0 ? (
                <EmptySearchState searchTerm={searchTerm} />
            ) : (
                <div className="space-y-4">
                    <TagGrid
                        tags={selectedFromFiltered}
                        onToggle={onToggle}
                        title={selectedFromFiltered.length > 0 ? "Selected" : undefined}
                        variant="selected"
                    />
                    <TagGrid
                        tags={unselectedFromFiltered}
                        onToggle={onToggle}
                        title={selectedFromFiltered.length > 0 ? "Available" : undefined}
                        variant="available"
                    />
                </div>
            )}
        </div>
    );
};
