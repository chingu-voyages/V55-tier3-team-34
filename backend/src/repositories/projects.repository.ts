import {NewProjectInput} from "../types/projects/schemas/projects";
import {projectContributors , projects , projectTags , users} from "../db/schema";
import {db} from "../db/db";
import {eq , or} from "drizzle-orm";
import {inArray} from "drizzle-orm/sql/expressions/conditions";


export const projectsRepository = ()  =>{
    const createProject = async (data: NewProjectInput) => {
        const {
            teammates,
            tags,
            ...rest
        } = data;
        return await db.transaction(async (dbx) =>{
            const newProject = await insertProject(rest, dbx)
            await addContributors(newProject.projectId, teammates, dbx);
            if (tags && tags.length > 0) {
                await addProjectTags(newProject.projectId, tags, dbx);
            }
            return newProject;
        })
    }
    const findUsersByIdentifiers = async (identifiers: { username?: string; email?: string }[]) => {
        const emails = identifiers.filter(i => i.email).map(i => i.email!);
        const usernames = identifiers.filter(i => i.username).map(i => i.username!);

        return db
            .select()
            .from(users)
            .where(or(
                inArray(users.email , emails),
                inArray(users.username , usernames))
            );
    }
     const getProjectById = async (id: number) =>  {
         return await db.query.projects.findFirst({
            where: eq(projects.projectId , id) ,
            with: {
                tags: true,
                projectContributors: {
                    contributors: true,
                    role: true
                }
            }
        });
    }
    const updateProject = async (projectId: number, data: Partial<NewProjectInput>) => {
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



async function  insertProject (
        data: Omit<NewProjectInput , "teammates" | "tags"> ,
        tx: typeof tx
    ) {
        const [project] = await tx.insert(projects).values(data).returning();
        return project;
    }
    async function addContributors(
    projectId: number,
    contributorIds: number[],
    tx: typeof tx
){
    if (contributorIds.length === 0) return;
    const values = contributorIds.map((contributorId) => ({
        projectId,
        contributorId,
    }));
    await tx.insert(projectContributors).values(values);
}
 async function  addProjectTags(
    projectId: number,
    tagIds: number[],
    tx: typeof tx
)  {
    const values = tagIds.map((tagId) => ({
        projectId,
        tagId,
    }));
    await tx.insert(projectTags).values(values);
}


