import {ProjectCard} from "@/features/projects/components/showcase/ProjectCard";
import React from "react";
import {getUserProjects} from "@/features/profile/api/get-user-project";



export default async function UserProjectsGrid({profileId}: {profileId: string}) {
    const [data, error] = await getUserProjects(profileId);
    const projects = data?.data ?? []
    if (error) {
        throw error
    }
    if(projects.length == 0) {
       return( <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-semibold">No contributions yet</p>
            <p className="text-gray-400 text-sm mt-2">
                This user has not contributed to any projects yet. Contributions will appear here once available.
            </p>
        </div>
       )
    }
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
                <ProjectCard project={project}  key={project.title}/>
            ))}

        </div>
    )
}
