import {Star , GitBranch , Globe , Calendar} from 'lucide-react';
import {Project} from "@/features/projects/types/projects";
import React from "react";
import {formatDate} from "@/utils/format";
import Link from "next/link";

interface ProjectHeaderProps {
    project: Project;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className=" gap-4 flex justify-between">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4" />
                        <span>Tier {project.tier}</span>
                        <span className="text-gray-400">•</span>
                        <span>Voyage {project.voyage}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium text-gray-900">{formatDate(project.createdAt)}</p>
                    </div>
                </div>
                {project.updatedAt && (
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Last Updated</p>
                            <p className="font-medium text-gray-900">{formatDate(project.updatedAt)}</p>
                        </div>
                    </div>
                )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div className="flex gap-3">
                {project.githubRepo && (

                    <Link
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg  transition-colors"
                    >
                        <GitBranch className="w-4 h-4" />
                        View Repository
                    </Link>
                )}
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Globe className="w-4 h-4" />
                    Live Demo
                </button>
            </div>
        </div>
    );
};
