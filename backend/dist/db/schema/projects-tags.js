"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTagsRelation = exports.projectTags = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const projects_1 = require("./projects");
const tags_1 = require("./tags");
const drizzle_orm_1 = require("drizzle-orm");
exports.projectTags = (0, pg_core_1.pgTable)('project_tags', {
    projectId: (0, pg_core_1.integer)('project_id').references(() => projects_1.projects.projectId).notNull(),
    tagId: (0, pg_core_1.integer)('tag_id').references(() => tags_1.tags.tagId).notNull()
}, (t) => [
    (0, pg_core_1.primaryKey)({ columns: [t.projectId, t.tagId] })
]);
exports.projectTagsRelation = (0, drizzle_orm_1.relations)(exports.projectTags, ({ one }) => ({
    project: one(projects_1.projects, {
        fields: [exports.projectTags.projectId],
        references: [projects_1.projects.projectId]
    }),
    tag: one(tags_1.tags, {
        fields: [exports.projectTags.tagId],
        references: [tags_1.tags.tagId]
    }),
}));
