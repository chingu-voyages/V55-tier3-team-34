import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {GetProjectDetailResponse } from "@/types/server-response";
import {api} from "@/utils/api-client";

export const getOneProjectById = ( projectId: string): Promise<AsyncFnResponse<GetProjectDetailResponse>> => {
    return handleAsync(() => api.get(`/projects/${projectId}`, ))
}
