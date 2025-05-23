import {integer , pgTable , unique , varchar} from "drizzle-orm/pg-core";

import {timestamps} from "../columns.helpers";
import {createInsertSchema} from "drizzle-zod";
import {relations} from "drizzle-orm";


export const users = pgTable('users', {
    userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
    displayName: varchar("display_name",{ length: 256}),
    email: varchar().notNull().unique(),
    bio: varchar(),
    avatarUrl: varchar("avatar_url",{length: 255}),
    ...timestamps
})

export const federatedCredentials = pgTable("federated_credentials", {
    federatedId: integer("federated_id").primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("federated_user_id").references(() => users.userId),
    provider: varchar({length: 50}).notNull(),
    providerUserId: varchar("provider_user_id", {length: 255}).notNull()
}, (table) => ({
    uniqueProviderUser: unique().on(table.provider, table.providerUserId)
    })
)

export const usersRelations = relations(users, ({many}) =>({
    federatedCredentials: many(federatedCredentials)
}))

export const FederatedCredentialsUsersRelation = relations(federatedCredentials, ({one}) => ({
    user: one(users,{
        fields: [federatedCredentials.userId],
        references: [users.userId]
    })
}))
export const userCreateSchema = createInsertSchema(users)
export type User = typeof users.$inferSelect;
export type FederatedCredential = typeof federatedCredentials.$inferSelect
export type FederatedCredentialWithUser = FederatedCredential & { user: User}
