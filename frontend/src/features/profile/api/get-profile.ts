import {handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";



export const getVoyagerProfile = async (userId: string) => {
    return handleAsync(() => api.get(`/profiles/${userId}`))
}

export const getAuthenticatedUser = async () => {
    return handleAsync(() =>  api.get('/auth/me'))
}
