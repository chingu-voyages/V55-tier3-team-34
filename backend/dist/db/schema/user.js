"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = exports.userCreateSchema = exports.federatedCredentialsUsersRelation = exports.usersRelations = exports.federatedCredentials = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const columns_helpers_1 = require("../columns.helpers");
exports.users = (0, pg_core_1.pgTable)('users', {
    userId: (0, pg_core_1.integer)("user_id").primaryKey().generatedAlwaysAsIdentity(),
    displayName: (0, pg_core_1.varchar)("display_name", { length: 256 }),
    email: (0, pg_core_1.varchar)().unique(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }), //
    firstname: (0, pg_core_1.varchar)("firstname", { length: 255 }), //
    lastname: (0, pg_core_1.varchar)("lastname", { length: 255 }), //
    bio: (0, pg_core_1.varchar)(),
    avatarUrl: (0, pg_core_1.varchar)("avatar_url", { length: 255 }),
    githubUrl: (0, pg_core_1.varchar)("github_url", { length: 255 }), //
    ...columns_helpers_1.timestamps
});
exports.federatedCredentials = (0, pg_core_1.pgTable)("federated_credentials", {
    federatedId: (0, pg_core_1.integer)("federated_id").primaryKey().generatedAlwaysAsIdentity(),
    userId: (0, pg_core_1.integer)("federated_user_id").references(() => exports.users.userId),
    provider: (0, pg_core_1.varchar)({ length: 50 }).notNull(),
    providerUserId: (0, pg_core_1.varchar)("provider_user_id", { length: 255 }).notNull()
}, (table) => ({
    uniqueProviderUser: (0, pg_core_1.unique)().on(table.provider, table.providerUserId)
}));
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    federatedCredentials: many(exports.federatedCredentials),
}));
exports.federatedCredentialsUsersRelation = (0, drizzle_orm_1.relations)(exports.federatedCredentials, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.federatedCredentials.userId],
        references: [exports.users.userId]
    })
}));
exports.userCreateSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users);
exports.userUpdateSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.users);
