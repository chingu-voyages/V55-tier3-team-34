"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.projectContributorsRelation = exports.projectRelations = exports.projectContributors = exports.projects = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const columns_helpers_1 = require("../columns.helpers");
const user_1 = require("./user");
const drizzle_orm_1 = require("drizzle-orm");
const roles_1 = require("./roles");
const drizzle_zod_1 = require("drizzle-zod");
const projects_tags_1 = require("./projects-tags");
exports.projects = (0, pg_core_1.pgTable)('projects', {
    projectId: (0, pg_core_1.integer)('project_id').primaryKey().generatedAlwaysAsIdentity(),
    title: (0, pg_core_1.varchar)({ length: 150 }).notNull(),
    shortDescription: (0, pg_core_1.varchar)('short_description', { length: 250 }).notNull(),
    longDescription: (0, pg_core_1.varchar)('long_description').notNull(),
    tier: (0, pg_core_1.integer)('tier'),
    voyage: (0, pg_core_1.integer)('voyage'),
    mainImageUrl: (0, pg_core_1.varchar)('main_image_url', { length: 255 }),
    githubRepo: (0, pg_core_1.varchar)({ length: 100 }),
    ...columns_helpers_1.timestamps,
});
exports.projectContributors = (0, pg_core_1.pgTable)('project_contributors', {
    projectId: (0, pg_core_1.integer)('project_id').references(() => exports.projects.projectId),
    contributorId: (0, pg_core_1.integer)('contributor_id').references(() => user_1.users.userId),
    roleId: (0, pg_core_1.integer)('role_id').references(() => roles_1.roles.roleId),
}, (t) => [
    (0, pg_core_1.primaryKey)({ columns: [t.projectId, t.contributorId] })
]);
exports.projectRelations = (0, drizzle_orm_1.relations)(exports.projects, ({ many }) => ({
    contributors: many(exports.projectContributors),
    tags: many(projects_tags_1.projectTags),
}));
exports.projectContributorsRelation = (0, drizzle_orm_1.relations)(exports.projectContributors, ({ one }) => ({
    project: one(exports.projects, {
        fields: [exports.projectContributors.projectId],
        references: [exports.projects.projectId]
    }),
    contributor: one(user_1.users, {
        fields: [exports.projectContributors.contributorId],
        references: [user_1.users.userId]
    }),
    role: one(roles_1.roles, {
        fields: [exports.projectContributors.roleId],
        references: [roles_1.roles.roleId]
    })
}));
exports.updateProjectSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.projects);
