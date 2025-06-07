"use server"
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";
import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";
import {PostProjectResponse} from "@/types/server-response";

export const submitProjectAction =async (data: ProjectSubmissionFormData) : Promise<AsyncFnResponse<PostProjectResponse>> => {
    return handleAsync(() => api.post('/projects', data))
}

