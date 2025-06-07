import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {GetTagsResponse} from "@/types/server-response";

import {api} from "@/utils/api-client";

export const getAllTagsAction = async (search: string): Promise<AsyncFnResponse<GetTagsResponse>>  =>{
    return handleAsync(() => api.get(`/tags`, { params: {'search': search}}));
}
