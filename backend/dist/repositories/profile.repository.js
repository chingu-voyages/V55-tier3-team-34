"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRepository = void 0;
const schema_1 = require("../db/schema");
const db_1 = require("../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const profileRepository = () => {
    const getAllProfiles = (limit, offset) => {
        return db_1.db.query.users.findMany({
            limit,
            offset,
            columns: {
                userId: true,
                displayName: true,
                firstname: true,
                lastname: true,
                bio: true,
                avatarUrl: true,
                githubUrl: true,
                createdAt: true
            },
        });
    };
    const getProfileById = async (id) => {
        const { password, ...rest } = (0, drizzle_orm_1.getTableColumns)(schema_1.users);
        return db_1.db.select({
            ...rest,
        }).from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.userId, id));
    };
    const updateUserProfile = (userId, data) => {
        return db_1.db
            .update(schema_1.users)
            .set({
            updatedAt: (0, drizzle_orm_1.sql) `NOW()`,
            ...data,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.users.userId, userId))
            .execute();
    };
    async function getUserProjectsWithRoles(userId) {
        return await db_1.db.query.projects.findMany({
            where: (projects, { exists, and, eq }) => exists(db_1.db.select({ projectId: schema_1.projectContributors.projectId, contributorId: schema_1.projectContributors.contributorId })
                .from(schema_1.projectContributors)
                .where((pc) => and(eq(pc.projectId, projects.projectId), eq(pc.contributorId, userId)))),
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
                            },
                        },
                        role: true,
                    },
                },
                tags: {
                    with: {
                        tag: true,
                    },
                },
            },
        });
    }
    return {
        updateUserProfile,
        getAllProfiles,
        getProfileById,
        getUserProjectsWithRoles,
    };
};
exports.profileRepository = profileRepository;
