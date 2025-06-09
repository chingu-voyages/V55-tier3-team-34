import {User} from "@/types/user";
import {Tag} from "@/features/projects/constants/project-data";
import {Project} from "@/features/projects/types/projects";

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
export type GetTagsResponse = ApiResponse<Tag[]>
export type PostProjectResponse= ApiResponse<Project>
export type GetProjectsResponse = ApiResponse<Project[]>
export type GetUserProjectsResponse = ApiResponse<Project[]>
export type GetSearchTeammateResponse = ApiResponse<User[]>
