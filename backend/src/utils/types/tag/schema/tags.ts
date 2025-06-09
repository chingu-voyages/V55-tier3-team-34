import {tags} from "../../../../db/schema";
import {z} from "zod";

const createTagSchema = z.object({
    name: z.string()
        .min(1, "Tag name is required")
        .max(50, "Tag name must be less than 50 characters")
        .trim()
        .transform(name => name.toLowerCase())
});

const createMultipleTagsSchema = z.object({
    tags: z.array(createTagSchema)
        .min(1, "At least one tag is required")
        .max(20, "Cannot create more than 20 tags at once")
});

const searchTagsSchema = z.object({
    search: z.string()
        .min(1, "Search term is required")
        .max(100, "Search term too long")
        .trim()
        .optional(),
    limit: z.coerce.number()
        .int()
        .min(1)
        .max(50)
        .default(10)
        .optional()
});

export type NewTag = typeof tags.$inferInsert
