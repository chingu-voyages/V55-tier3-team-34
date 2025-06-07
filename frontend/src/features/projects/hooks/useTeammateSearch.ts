import { useState, useEffect } from 'react'
import {User} from "@/types/user";
import {useDebounce} from "@/hooks/useDebounce";
import useServerAction from "@/hooks/useServerAction";
import {handleAsync} from "@/utils/handleAsync";
import {api} from "@/utils/api-client";


export const getAllTeammatesAction = (search: string) => {
    return handleAsync(() => api.get('/projects/search/teammates', { params: {search: search}}))
}
export const useTeammateSearch = (search: string) => {
    const {runAction, isLoading, setIsLoading} = useServerAction(getAllTeammatesAction)
    const [error, setError] = useState<string | null>(null)
    const [teammates, setTeammates] = useState<User[]>([])
    const debouncedSearch = useDebounce(search, 300)
    useEffect(() => {
        setIsLoading(true)
        setError(null)
        runAction(debouncedSearch)
            .then((response) => {
                const [data, error] = response
                if(data) {
                    setTeammates(data.data as User[])
                } else {
                    setError(error?.message ?? "Failed to search teammates")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [debouncedSearch, runAction])

    return {
        data: teammates,
        isLoading,
        error
    }
}
