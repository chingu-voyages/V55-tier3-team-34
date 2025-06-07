'use client'

import React , { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {projects , TIERS , tiers , voyages} from "@/features/projects/constants/project-data";
import {Input} from "@/components/ui/input";
import {Select , SelectContent , SelectItem , SelectTrigger , SelectValue} from "@/components/ui/select";
import {Option} from "lucide-react";



export default function ProjectsPage() {
    const [selectedTier, setSelectedTier] = useState("All Tiers")
    const [selectedVoyage, setSelectedVoyage] = useState("All Voyages")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProjects = projects.filter(project => {
        const matchesTier = selectedTier === "All Tiers" || project.tier === selectedTier
        const matchesVoyage = selectedVoyage === "All Voyages" || project.voyage === selectedVoyage
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))

        return matchesTier && matchesVoyage && matchesSearch
    })

    const getTierColor = (tier: string) => {
        switch (tier) {
            case "Tier 1": return "bg-green-100 text-green-800"
            case "Tier 2": return "bg-blue-100 text-blue-800"
            case "Tier 3": return "bg-purple-100 text-purple-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Showcase</h1>
                <p className="text-gray-600">Explore amazing projects built by Chingu participants from around the world</p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Search projects, technologies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2"
                    />
                </div>

                <div className="flex gap-4">
                    <Select  onValueChange={(value) => setSelectedTier(value)}>
                        <SelectTrigger>
                            <SelectValue  placeholder="Select a tier" />
                        </SelectTrigger>
                        <SelectContent>
                            {tiers.map(tier => (
                                <SelectItem  key={tier} value={tier}>
                                    {tier}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setSelectedVoyage(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a voyage" />
                        </SelectTrigger>
                        <SelectContent className="h-full">
                            {voyages.map(voyage => (
                                <SelectItem key={voyage} value={voyage}>
                                    {voyage}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Results count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredProjects.length} of {projects.length} projects
                </p>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <div key={project.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                        <div className="relative h-48 bg-gray-200">
                            <Image
                                src={project.image}
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
                                    {project.tier}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">Technologies:</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map(tech => (
                                        <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Team Members:</p>
                                <p className="text-sm text-gray-700">
                                    {project.teamMembers.join(", ")}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span>{project.voyage}</span>
                                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gray-900 text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                                >
                                    GitHub
                                </Link>
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-tertiary text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Live Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    )
}
