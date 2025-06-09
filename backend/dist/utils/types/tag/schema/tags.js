"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createTagSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(1, "Tag name is required")
        .max(50, "Tag name must be less than 50 characters")
        .trim()
        .transform(name => name.toLowerCase())
});
const createMultipleTagsSchema = zod_1.z.object({
    tags: zod_1.z.array(createTagSchema)
        .min(1, "At least one tag is required")
        .max(20, "Cannot create more than 20 tags at once")
});
const searchTagsSchema = zod_1.z.object({
    search: zod_1.z.string()
        .min(1, "Search term is required")
        .max(100, "Search term too long")
        .trim()
        .optional(),
    limit: zod_1.z.coerce.number()
        .int()
        .min(1)
        .max(50)
        .default(10)
        .optional()
});
