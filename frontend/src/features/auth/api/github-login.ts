"use server"
import {api} from "@/utils/api-client";
import {handleAsync} from "@/utils/handleAsync";


export const loginWithGithub = async () => {
    return handleAsync(() => api.get('/auth/github'))
}
