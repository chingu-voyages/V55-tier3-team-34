import {getProjects} from "@/features/projects/api/get-projects";
import {MayBe} from "@/utils/type";
import {ProjectCard} from "@/features/projects/components/showcase/ProjectCard";
import React from "react";


export interface ProjectSearchOptions {
    search: MayBe<string>,
    tier: MayBe<string>,
}
type ProjectGridProps = {
    filterOptions: ProjectSearchOptions
}

export async function ProjectGrid({ filterOptions }: ProjectGridProps) {
    const [data, error] = await getProjects(filterOptions)
    const projects = data?.data ?? []
    if (error) {
        throw error
    }
   return(
       <div className="px-4">
           <div className="mb-6">
               <p className="text-gray-600">
                   Search results: {projects.length}  project(s)
               </p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {projects.map(project => (
                   <ProjectCard project={project}  key={project.title}/>
               ))}
           </div>
           {projects.length === 0  && (
               <div className="text-center py-12">
                   <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                   <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
               </div>
           )}
       </div>
   )
}
