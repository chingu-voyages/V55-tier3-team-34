import {integer , pgTable , primaryKey} from "drizzle-orm/pg-core";
import {projects} from "./projects";
import {tags} from "./tags";
import {relations} from "drizzle-orm";

export const projectTags = pgTable('project_tags', {
    projectId: integer('project_id').references(() => projects.projectId).notNull(),
    tagId: integer('tag_id').references(() => tags.tagId).notNull()
}, (t) => [
    primaryKey({ columns: [t.projectId, t.tagId] })
]);

export const projectTagsRelation = relations(projectTags, ({ one }) => ({
    project: one(projects, {
        fields: [projectTags.projectId],
        references: [projects.projectId]
    }),
    tag: one(tags, {
        fields: [projectTags.tagId],
        references: [tags.tagId]
    }),
}));
