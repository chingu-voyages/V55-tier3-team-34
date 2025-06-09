"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsRelation = exports.tags = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const projects_tags_1 = require("./projects-tags");
exports.tags = (0, pg_core_1.pgTable)('tags', {
    tagId: (0, pg_core_1.integer)("tag_id").primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)('name', { length: 50 }).notNull().unique()
});
exports.tagsRelation = (0, drizzle_orm_1.relations)(exports.tags, ({ many }) => ({
    projectTags: many(projects_tags_1.projectTags),
}));
