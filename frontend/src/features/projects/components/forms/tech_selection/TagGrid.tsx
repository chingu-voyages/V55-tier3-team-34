import React from "react";
import {Tag} from "@/features/projects/constants/project-data";


interface TagGridProps {
    tags: Tag[];
    onToggle: (tagId: number) => void;
    title?: string;
    variant: 'selected' | 'available';
}
export const TagGrid = ({ tags, onToggle, title, variant }: TagGridProps) => {
    if (tags.length === 0) return null;
    const isSelected = variant === 'selected';
    return (
        <div>
            {title && (
                <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                    {title}
                </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {tags.map((tag) => (
                    <div
                        key={tag.tagId}
                        onClick={() => onToggle(tag.tagId)}
                        className={`cursor-pointer p-3 rounded-lg border transition-colors ${
                            isSelected
                                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                                : 'bg-background hover:bg-muted border-border hover:border-primary/50'
                        }`}
                    >
                        <div className="text-center text-sm font-medium">
                            {tag.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
