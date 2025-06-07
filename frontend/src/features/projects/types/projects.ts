import {MayBe} from "@/utils/type";
import {User} from "@/types/user";
import {Tag} from "@/features/projects/constants/project-data";

export interface Project {
    projectId: number
    title: string
    shortDescription: string
    longDescription: string
    tier: number
    voyage: number
    mainImageUrl: MayBe<string>
    githubRepo: MayBe<string>
    contributors: Array<{
        projectId: number
        contributorId: number
        contributor: User
    }>
    tags: Array<{
        projectId: number | null
        tagId: number | null
        tag: Tag
    }>
    createdAt: Date
    updatedAt: Date
}
