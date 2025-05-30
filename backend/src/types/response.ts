
export interface AppResponse<T>{
    message?: string,
    status: number,
    data?: T,
}
