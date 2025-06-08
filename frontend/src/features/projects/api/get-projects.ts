import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";
import {GetProjectsResponse} from "@/types/server-response";
import {ProjectSearchOptions} from "@/features/projects/components/showcase/ProjectGrid";


export const getProjects = ( searchOption: ProjectSearchOptions): Promise<AsyncFnResponse<GetProjectsResponse>> => {
    return handleAsync(() => api.get('/projects', { params: {search: searchOption.search, tier: searchOption.tier}}))
}
