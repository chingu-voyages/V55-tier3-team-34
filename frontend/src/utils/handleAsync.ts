import {MayBe} from "@/utils/type";


export type AsyncFn<T> = () => Promise<T>
export type AsyncFnResponse<T> = [MayBe<T>, MayBe<Error>]
export const handleAsync= async <T>(
    asyncFn: AsyncFn<T>
): Promise<AsyncFnResponse<T>> => {
    try {
        const response = await asyncFn()
        return [response, null]
    }catch (e) {
        return [null, e]
    }
}
