import {integer , pgTable , primaryKey , varchar} from "drizzle-orm/pg-core";
import {timestamps} from "../columns.helpers";
import {users} from "./user";
import {relations} from "drizzle-orm";
import {tags} from "./tags";
import {roles} from "./roles";
import {createInsertSchema , createSchemaFactory , createUpdateSchema} from "drizzle-zod";
import {z , ZodSchema} from "zod";


export const projects = pgTable('projects', {
    projectId:  integer('project_id').primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({length: 150}).notNull(),
    shortDescription: varchar('short_description',{length: 250}).notNull(),
    longDescription: varchar('long_description').notNull(),
    tier: integer('tier'),
    voyage: integer('voyage'),
    mainImageUrl: varchar('main_image_url', { length: 255}),
    githubRepo: varchar({ length: 100}),
    ...timestamps,
})

export const projectContributors = pgTable('project_contributors', {
    projectId: integer('project_id').references(() => projects.projectId),
    contributorId: integer('contributor_id').references(() => users.userId),
    roleId: integer('role_id').references(() => roles.roleId),
},
    (t) => [
        primaryKey({ columns: [t.projectId, t.contributorId] })
    ])

export const projectRelations = relations(projects, ({ many}) => ({
    contributors: many(projectContributors),
    tags: many(projectTags),}
))

export const projectContributorsRelation = relations(projectContributors, ({one}) =>({
    project: one(projects, {
        fields: [projectContributors.projectId],
        references: [projects.projectId]
    }),
    contributor: one(users, {
        fields: [projectContributors.contributorId],
        references: [users.userId]
    }),
    role: one(roles, {
        fields: [projectContributors.roleId],
        references: [roles.roleId]
    })
}))
export const projectTags = pgTable('project_tags', {
    projectId: integer('project_id').references(() => projects.projectId),
    tagId: integer('tag_id').references(() => tags.tagId)
},(t) => [
    primaryKey({ columns: [t.projectId, t.tagId] })
])

export const projectTagsRelation = relations(projectTags, ({many, one}) => ({
    project: one(projects, {
        fields: [projectTags.projectId],
        references: [projects.projectId]
    }),
    tag: one(tags, {
        fields: [projectTags.tagId],
        references: [tags.tagId]
    }),
}))


export const updateProjectSchema = createUpdateSchema(projects);



