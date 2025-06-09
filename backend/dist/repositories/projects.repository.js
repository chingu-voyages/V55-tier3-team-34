"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsRepository = void 0;
const schema_1 = require("../db/schema");
const db_1 = require("../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const projectsRepository = () => {
    const createProject = async (data) => {
        try {
            const { teammates, tags, ...rest } = data;
            const projectData = { ...rest };
            const newProject = await insertProject(projectData);
            if (teammates && teammates.length > 0) {
                await addContributors(newProject.projectId, teammates);
            }
            if (tags && tags.length > 0) {
                await addProjectTags(newProject.projectId, tags);
            }
            return newProject;
        }
        catch (error) {
            console.error("Failed to create project:", error);
            throw new Error("Failed to create project");
        }
    };
    const findUsersByIdentifiers = async (keyword) => {
        const pattern = `%${keyword.trim()}%`;
        console.log(pattern);
        return db_1.db
            .select({
            userId: schema_1.users.userId,
            email: schema_1.users.email,
            displayName: schema_1.users.displayName,
            firstname: schema_1.users.firstname,
            lastname: schema_1.users.lastname,
            avatarUrl: schema_1.users.avatarUrl,
        })
            .from(schema_1.users)
            .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(schema_1.users.displayName, pattern), (0, drizzle_orm_1.ilike)(schema_1.users.email, pattern), (0, drizzle_orm_1.ilike)(schema_1.users.firstname, pattern), (0, drizzle_orm_1.ilike)(schema_1.users.lastname, pattern), (0, drizzle_orm_1.ilike)((0, drizzle_orm_1.sql) `CONCAT(${schema_1.users.firstname}, ' ', ${schema_1.users.lastname})`, pattern), (0, drizzle_orm_1.ilike)((0, drizzle_orm_1.sql) `CONCAT(${schema_1.users.lastname}, ' ', ${schema_1.users.firstname})`, pattern)))
            .limit(5);
    };
    const getProjectById = async (id) => {
        return await db_1.db.query.projects.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.projects.projectId, id),
            with: {
                tags: true,
                contributors: true
            }
        });
    };
    const updateProject = async (projectId, data) => {
        const [updated] = await db_1.db
            .update(schema_1.projects)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema_1.projects.projectId, projectId))
            .returning();
        return updated;
    };
    const listProjects = async () => {
        return db_1.db.query.projects.findMany({
            with: {
                contributors: {
                    columns: {},
                    with: {
                        contributor: {
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
    };
};
exports.projectsRepository = projectsRepository;
async function insertProject(data) {
    const [project] = await db_1.db.insert(schema_1.projects).values(data).returning();
    return project;
}
async function addContributors(projectId, contributorIds) {
    if (contributorIds.length === 0)
        return;
    const values = contributorIds.map((contributorId) => ({
        projectId,
        contributorId,
    }));
    try {
        await db_1.db.insert(schema_1.projectContributors).values(values);
    }
    catch (e) {
        console.error(e);
    }
}
async function addProjectTags(projectId, tagIds) {
    const values = tagIds.map((tagId) => ({
        projectId,
        tagId,
    }));
    await db_1.db.insert(schema_1.projectTags).values(values);
}
