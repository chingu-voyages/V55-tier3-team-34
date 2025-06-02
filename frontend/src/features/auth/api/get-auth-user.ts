import {AsyncFnResponse , handleAsync} from "@/utils/handleAsync";
import {GetAuthUserResponse} from "@/types/server-response";
import {api} from "@/utils/api-client";

export const getAuthenticatedUser = async ():Promise<AsyncFnResponse<GetAuthUserResponse>> => {
    return handleAsync(() =>  api.get('/auth/me'))
}
