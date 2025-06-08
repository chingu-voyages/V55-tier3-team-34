import {Project} from "@/features/projects/types/projects";

export const getProjectTechnologies = (project: Project): string[] => {
    return project.tags.map(tagObj => tagObj.tag.name)
}

export const getContributorNames = (project: Project): string[] => {
    return project.contributors.map(contrib => {
        const { displayName, firstname, lastname } = contrib.contributor
        return displayName || `${firstname || ''} ${lastname || ''}`.trim() || 'Anonymous'
    })
}


export const getTierColor = (tier: number) => {
    switch (tier) {
        case 1: return "bg-green-100 text-green-800"
        case 2: return "bg-blue-100 text-blue-800"
        case 3: return "bg-purple-100 text-purple-800"
        default: return "bg-gray-100 text-gray-800"
    }
}
