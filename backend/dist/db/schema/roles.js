"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.roles = (0, pg_core_1.pgTable)('roles', {
    roleId: (0, pg_core_1.integer)('role_id').primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 50 }).notNull().unique(),
});
