import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";
import {GetVoyagersResponse} from "@/types/server-response";

export const getVoyagers = async (): Promise<AsyncFnResponse<GetVoyagersResponse>> => {
    return handleAsync(() => api.get('/profiles', {params: { limit: 20, page: 1}}),)
}
