import {integer , pgTable , unique , varchar} from "drizzle-orm/pg-core";
import {createInsertSchema , createUpdateSchema} from "drizzle-zod";
import {relations} from "drizzle-orm";
import { userVoyages } from "./user_voyages";
import { voyages } from "./voyages";


import {timestamps} from "../columns.helpers";


export const users = pgTable('users', {
    userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
    displayName: varchar("display_name",{ length: 256}),
    email: varchar().notNull().unique(),
    password: varchar("password", { length: 255 }),//
    firstname: varchar("firstname", { length: 255 }), //
    lastname: varchar("lastname", { length: 255 }), //
    bio: varchar(),
    avatarUrl: varchar("avatar_url",{length: 255}),
    githubUrl: varchar("github_url", { length: 255 }),//
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
    federatedCredentials: many(federatedCredentials),
    userVoyages: many(userVoyages)
}))

export const federatedCredentialsUsersRelation = relations(federatedCredentials, ({one}) => ({
    user: one(users,{
        fields: [federatedCredentials.userId],
        references: [users.userId]
    })
}))

export const userVoyagesRelations = relations(userVoyages, ({ one }) => ({
  user: one(users, {
    fields: [userVoyages.userId],
    references: [users.userId]
  }),
  voyage: one(voyages, {
    fields: [userVoyages.voyageId],
    references: [voyages.voyageId]
  })
}));

export const userCreateSchema = createInsertSchema(users);
export const userUpdateSchema = createUpdateSchema(users)
export type UpdateUser = Partial<typeof users.$inferInsert>
export type User = typeof users.$inferSelect;
export type FederatedCredential = typeof federatedCredentials.$inferSelect
export type FederatedCredentialWithUser = FederatedCredential & { user: User}

