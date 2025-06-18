import {MayBe} from "@/utils/type";


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
        contributor: {
            userId: number
            displayName: string | null
            firstname: string | null
            lastname: string | null,
            avatarUrl: string | null
        }
        role: {
            roleId: string | null,
            name: string
        }
    }>
    tags: Array<{
        projectId: number
        tagId: number
        tag: {
            tagId: number
            name: string
        }
    }>
    createdAt: string
    updatedAt: string | null
    deletedAt: string | null
}
