import {NewProjectInput , ProjectInsertData , UpdateProjectInput} from "../types/projects/schemas/projects";
import {projectContributors , projects , projectTags , users} from "../db/schema";
import {db} from "../db/db";
import {eq , ilike , or , sql} from "drizzle-orm";




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
    const findUsersByIdentifiers = async (keyword: string ) => {
        const pattern = `%${keyword.trim()}%`;
        console.log(pattern)
        return db
          .select({
                userId: users.userId,
                email: users.email,
                displayName: users.displayName,
                firstname: users.firstname,
                lastname: users.lastname,
                avatarUrl: users.avatarUrl,
             })

          .from(users)
          .where(or(
              ilike(users.displayName, pattern),
              ilike(users.email, pattern),
              ilike(users.firstname, pattern),
              ilike(users.lastname, pattern),
              ilike(sql`CONCAT(${users.firstname}, ' ', ${users.lastname})`, pattern),
              ilike(sql`CONCAT(${users.lastname}, ' ', ${users.firstname})`, pattern)
          ))
            .limit(5)
    };
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
        return db.query.projects.findMany({
            with: {
                contributors: {
                    columns: {},
                    with: {
                        contributor:{
                            columns: {
                                userId: true,
                                displayName: true,
                                firstname: true,
                                lastname: true,
                            }
                        },
                        role: true
                    }
                },
                tags: {
                    with: {
                        tag: true
                    }
                }
            }
        });
    };

    return {
        getProjectById,
        createProject,
        listProjects,
        updateProject,
        findUsersByIdentifiers
    }
}




async function  insertProject(
    data: ProjectInsertData ,
) {

    const [project] = await db.insert(projects).values(data).returning()
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
    try{
        await db.insert(projectContributors).values(values);
    }catch (e) {
        console.error(e)
    }

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


