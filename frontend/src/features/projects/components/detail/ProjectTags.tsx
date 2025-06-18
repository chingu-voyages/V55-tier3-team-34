import { Tag } from 'lucide-react';
import React from "react";
import {Project} from "@/features/projects/types/projects";
import {Badge} from "@/components/ui/badge";

interface ProjectTagsProps {
    project: Project;
}

export const ProjectTags: React.FC<ProjectTagsProps> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tagItem) => (
                    <Badge
                        key={tagItem.tag.tagId}
                        variant="outline"
                        className="text-xs px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        {tagItem.tag.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
};
