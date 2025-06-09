"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(150, 'Title must be 150 characters or less'),
    shortDescription: zod_1.z.string().min(1, 'Short description is required').max(250, 'Short description must be 250 characters or less'),
    longDescription: zod_1.z.string().min(1, 'Long description is required'),
    tier: zod_1.z.number().int().nullable().optional(),
    voyage: zod_1.z.number().int().nullable().optional(),
    mainImageUrl: zod_1.z.string().url('Must be a valid URL').nullable().optional(),
    githubRepo: zod_1.z.string().max(100).nullable().optional(),
    teammates: zod_1.z.array(zod_1.z.number().int().positive(), {
        required_error: 'Teammates array is required'
    }),
    tags: zod_1.z.array(zod_1.z.number().int().positive(), {
        required_error: 'Tags array is required'
    })
});
