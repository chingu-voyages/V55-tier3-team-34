import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Project} from "@/features/projects/types/projects";
import {getContributorNames , getProjectTechnologies , getTierColor} from "@/features/projects/utils/project";
import {Button} from "@/components/ui/button";


type  ProjectCardProps = {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return(
        <div key={project.projectId} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="relative h-48 bg-gray-200">
                <Image
                    src={ project.mainImageUrl ?? '/placeholder-project.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierColor(project.tier)}`}>
                        Tier {project.tier}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.shortDescription}
                </p>

                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                        {getProjectTechnologies(project).map(tech => (
                            <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Team Members:</p>
                    <p className="text-sm text-gray-700">
                        {getContributorNames(project).join(", ")}
                    </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Voyage {project.voyage}</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-3">
                    {project.githubRepo && (
                        <Link
                            href={project.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex justify-center items-center bg-gray-900 text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                        >
                            GitHub
                        </Link>
                    )}
                    <Button
                        className="flex-1 bg-tertiary flex justify-center items-center text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                        disabled
                    >
                        Live Demo
                    </Button>
                </div>
            </div>
        </div>
    )
}
