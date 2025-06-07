import {useCallback , useState} from "react";
import {AsyncFnResponse} from "@/utils/handleAsync";

export type ActionType<X, Y> = (arg: X) => Promise<AsyncFnResponse<Y>>;

interface UseServerActionResult<X, Y> {
    runAction: ActionType<X, Y>;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}


export default function useServerAction<Q,T>(
    action: ActionType<Q , T>
): UseServerActionResult<Q , T> {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const runAction = useCallback((
            async (arg: Q) => {
                setIsLoading(true)
                return await action(arg)
            }
        ),
        [action]
    )
    return { runAction, isLoading, setIsLoading }
}
