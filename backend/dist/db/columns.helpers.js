"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamps = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.timestamps = {
    updatedAt: (0, pg_core_1.timestamp)(),
    createdAt: (0, pg_core_1.timestamp)().defaultNow().notNull(),
    deletedAt: (0, pg_core_1.timestamp)(),
};
