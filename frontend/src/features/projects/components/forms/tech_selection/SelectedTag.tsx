import React from "react";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {Tag} from "@/features/projects/constants/project-data";

export const SelectedTags: React.FC<{
    selectedTags: Tag[];
    onRemove: (tagId: number) => void;
}> = ({ selectedTags, onRemove }) => {
    if (selectedTags.length === 0) return null;
    return (
        <div>
            <Label className="text-sm font-medium">
                Selected Technologies ({selectedTags.length}):
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tag) => (
                    <Badge
                        key={tag.tagId}
                        variant="default"
                        className="flex items-center gap-1 pr-1"
                    >
                        {tag.name}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(tag.tagId)}
                            className="h-4 w-4 p-0 hover:bg-transparent"
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    </Badge>
                ))}
            </div>
        </div>
    );
};
