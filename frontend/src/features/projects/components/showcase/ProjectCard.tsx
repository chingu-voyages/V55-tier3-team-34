import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Project} from "@/features/projects/types/projects";
import {getContributorNames , getProjectTechnologies , getTierColor} from "@/features/projects/utils/project";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";


type  ProjectCardProps = {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card
            key={project.projectId}
            className="flex flex-col h-full overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md bg-white"
        >
            <CardHeader className=" p-0">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <Image
                        src={project.mainImageUrl ?? '/placeholder-project.jpg'}
                        alt={project.title}
                        fill
                        className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant="secondary"
                            className={`${getTierColor(project.tier)} shadow-sm backdrop-blur-sm bg-white/90`}
                        >
                            Tier {project.tier}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1  space-y-3">
                <div className="min-h-[3.5rem] flex items-start">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                        {project.title}
                    </h3>
                </div>
                <div className="flex justify-start min-h-[4.5rem]">
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {project.shortDescription}
                    </p>
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Technologies
                    </p>
                    <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
                        {getProjectTechnologies(project).map(tech => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="space-y-2 min-h-[3rem]">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Team Members
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                        {getContributorNames(project).join(", ")}
                    </p>
                </div>

                <div className="flex-1" />
            </CardContent>

            <CardFooter className=" flex flex-col p-6 pt-0 mt-auto">
                <div className="w-full flex justify-between items-center text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Voyage {project.voyage}
                    </span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="w-full flex gap-3">
                    {project.githubRepo && (
                        <Button
                            asChild
                            variant="default"
                            className="flex-1 bg-gray-900 hover:bg-gray-800 transition-colors"
                        >
                            <Link
                                href={project.githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </Link>
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        className="flex-1 border-gray-200 hover:bg-gray-50 transition-colors"
                        disabled
                    >
                        Live Demo
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
