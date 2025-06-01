import {NewProjectInput , ProjectInsertData , UpdateProjectInput} from "../types/projects/schemas/projects";
import {projectContributors , projects , projectTags , users} from "../db/schema";
import {db} from "../db/db";
import {eq , ilike , or} from "drizzle-orm";




export const projectsRepository = ()  =>{
    const createProject = async (data: NewProjectInput) => {
        try {
            const { teammates, tags, ...rest } = data;
            const projectData: ProjectInsertData = { ...rest };
            const newProject = await insertProject(projectData);
            if (teammates && teammates.length > 0) {
                await addContributors(newProject.projectId, teammates);
            }
            if (tags && tags.length > 0) {
                await addProjectTags(newProject.projectId, tags);
            }
            return newProject;
        } catch (error) {
            console.error("Failed to create project:", error);
            throw new Error("Failed to create project");
        }
    };
    const findUsersByIdentifiers = async (identifiers: { keyword: string}) => {
        return db
            .select()
            .from(users)
            .where(or(
                ilike(users.email, identifiers.keyword ?? ""),
                ilike(users.displayName, identifiers.keyword),)
            );
    }
     const getProjectById = async (id: number) =>  {
         return await db.query.projects.findFirst({
            where: eq(projects.projectId , id) ,
            with: {
                tags: true,
                contributors: true
            }
        });
    }
    const updateProject = async (projectId: number, data: UpdateProjectInput) => {
        const [updated] = await db
            .update(projects)
            .set(data)
            .where(eq(projects.projectId, projectId))
            .returning();
        return updated;
    };
    const listProjects = async () => {
        return db.select().from(projects);
    };

    return {
        getProjectById,
        createProject,
        listProjects,
        updateProject
    }
}




async function  insertProject(
    data: ProjectInsertData ,
) {
    const [project] = await db.insert(projects).values([data]).returning()
    return project;
}


    async function addContributors(
    projectId: number,
    contributorIds: number[],

){
    if (contributorIds.length === 0) return;
    const values = contributorIds.map((contributorId) => ({
        projectId,
        contributorId,
    }));
    await db.insert(projectContributors).values(values);
}
 async function  addProjectTags(
    projectId: number,
    tagIds: number[],
)  {
    const values = tagIds.map((tagId) => ({
        projectId,
        tagId,
    }));
    await db.insert(projectTags).values(values);
}


