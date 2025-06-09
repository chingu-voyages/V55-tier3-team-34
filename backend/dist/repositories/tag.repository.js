"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagRepository = void 0;
const db_1 = require("../db/db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const tagRepository = () => {
    const createTags = (data) => {
        return db_1.db.insert(schema_1.tags).values(data);
    };
    const getAllTags = (searchTerm) => {
        return db_1.db
            .select({
            tagId: schema_1.tags.tagId,
            name: schema_1.tags.name,
        })
            .from(schema_1.tags)
            .where((0, drizzle_orm_1.ilike)(schema_1.tags.name, "%" + searchTerm + "%"))
            .limit(10);
    };
    return {
        createTags,
        getAllTags
    };
};
exports.tagRepository = tagRepository;
