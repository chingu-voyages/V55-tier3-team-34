import {useEffect , useState} from "react";

import useServerAction from "@/hooks/useServerAction";
import {getAllTagsAction} from "@/features/projects/api/get-tags";
import {Tag} from "@/features/projects/constants/project-data";
import {useDebounce} from "@/hooks/useDebounce";



export const useTags = (search: string) => {
    const {runAction, isLoading, setIsLoading} = useServerAction(getAllTagsAction)
    const [error, setError] = useState<string | null>(null);
    const [tags, setTags] = useState<Tag[]>([])
    const debouncedSearch = useDebounce(search, 300)

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        runAction(debouncedSearch)
            .then((response) => {
                const [data, error] = response;
                if(data) {
                    setTags(data.data as Tag[])
                }else  {
                    setError(error?.message ?? "")
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debouncedSearch, runAction]);

    return {
        data: tags,
        isLoading,
        error
    };
};
