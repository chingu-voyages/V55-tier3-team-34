import {z} from "zod";
import {projects} from "../../../../db/schema";


export const createProjectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(150, 'Title must be 150 characters or less'),
    shortDescription: z.string().min(1, 'Short description is required').max(250, 'Short description must be 250 characters or less'),
    longDescription: z.string().min(1, 'Long description is required'),
    tier: z.number().int().nullable().optional(),
    voyage: z.number().int().nullable().optional(),
    mainImageUrl: z.string().url('Must be a valid URL').nullable().optional(),
    githubRepo: z.string().max(100).nullable().optional(),
    teammates: z.array(z.number().int().positive(), {
        required_error: 'Teammates array is required'
    }),
    tags: z.array(z.number().int().positive(), {
        required_error: 'Tags array is required'
    })
});


export type NewProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = Partial<NewProjectInput>;
export type ProjectInsertData = typeof projects.$inferInsert;
