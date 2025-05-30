import {User} from "@/types/user";

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    statusCode?: number;
}


export interface UserProfile extends User {}


export type GetVoyagersResponse = ApiResponse<UserProfile[]>
export type GetProfileResponse = ApiResponse<UserProfile>
export type GetAuthUserResponse = ApiResponse<User>
