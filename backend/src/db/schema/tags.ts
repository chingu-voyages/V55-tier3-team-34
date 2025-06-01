import {integer , pgTable , varchar} from "drizzle-orm/pg-core";

export const tags = pgTable('tags', {
    tagId: integer("tag_id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 50}).notNull().unique()
})
