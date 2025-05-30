import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";
import {GetAuthUserResponse , GetProfileResponse} from "@/types/server-response";



export const getVoyagerProfile = async (userId: string): Promise<AsyncFnResponse<GetProfileResponse>> => {
    return handleAsync(() => api.get(`/profiles/${userId}`))
}



export const getAuthenticatedUser = async ():Promise<AsyncFnResponse<GetAuthUserResponse>> => {
    return handleAsync(() =>  api.get('/auth/me'))
}
