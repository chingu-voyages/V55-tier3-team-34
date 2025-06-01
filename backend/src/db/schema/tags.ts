import {integer , pgTable , varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {projects , projectTags} from "./projects";

export const tags = pgTable('tags', {
    tagId: integer("tag_id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 50}).notNull().unique()
})

export const tagsRelation = relations(tags, ({ many }) => ({
    projectTags: many(projectTags),
}));
