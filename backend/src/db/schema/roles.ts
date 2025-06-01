import {integer , pgTable , varchar} from "drizzle-orm/pg-core";

export const roles = pgTable('roles', {
    roleId: integer('role_id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 50 }).notNull().unique(),
})
