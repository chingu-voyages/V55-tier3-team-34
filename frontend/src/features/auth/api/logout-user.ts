import {handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";

export const logoutUserAction = async () => {
    return handleAsync(() => api.post('/auth/logout'))
}
