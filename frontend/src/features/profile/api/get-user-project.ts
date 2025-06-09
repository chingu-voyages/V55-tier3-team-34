import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";
import {GetUserProjectsResponse} from "@/types/server-response";


export const getUserProjects = (userId: string): Promise<AsyncFnResponse<GetUserProjectsResponse>> => {
    return handleAsync(() => api.get(`/profiles/projects/${userId}`))
}
