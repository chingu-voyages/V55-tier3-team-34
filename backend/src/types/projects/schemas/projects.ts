import {createProjectSchema , projects} from "../../../db/schema/projects";
import {z} from "zod";


export const fullProjectSubmitSchema = createProjectSchema.extend({
    teammates: z.array(z.number()).min(1, "At least one teammate is required"),
    tags: z.array(z.number()).optional()
})


export type NewProjectInput = z.infer<typeof fullProjectSubmitSchema>;
export type UpdateProjectInput = Partial<NewProjectInput>;
export type ProjectInsertData = typeof projects.$inferInsert;
