import {useCallback} from "react";
import {usePathname , useRouter , useSearchParams} from "next/navigation";

export function useUrlFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const getFilter = useCallback((key: string) => {
        return searchParams.get(key) || ''
    }, [searchParams])
    
    const getAllFilters = useCallback(() => {
        const filters = {}
        for (const [key, value] of searchParams.entries()) {
            filters[key] = value
        }
        return filters
    }, [searchParams])
    
    const createQueryString = useCallback(
        (updates: Record<string , string | undefined | null>) => {
            const params = new URLSearchParams(searchParams.toString())
            Object.entries(updates).forEach(([key, value]) => {
                if (value && value !== '') {
                    params.set(key, value)
                } else {
                    params.delete(key)
                }
            })
            return params.toString()
        },
        [searchParams]
    )
    const updateFilters = useCallback((updates) => {
        const queryString = createQueryString(updates)
        router.push(pathname + (queryString ? '?' + queryString : ''))
    }, [createQueryString, router, pathname])
    
    const updateFilter = useCallback((key, value) => {
        updateFilters({ [key]: value })
    }, [updateFilters])

    
    const clearFilters = useCallback(() => {
        router.push(pathname)
    }, [router, pathname])
    
    const clearSpecificFilters = useCallback((keys) => {
        const updates = {}
        keys.forEach(key => {
            updates[key] = ''
        })
        updateFilters(updates)
    }, [updateFilters])
 
    const hasActiveFilters = searchParams.toString().length > 0
    const activeFilterCount = Array.from(searchParams.keys()).length

    return {
        getFilter,
        getAllFilters,
        hasActiveFilters,
        activeFilterCount,
        updateFilter,
        updateFilters,
        clearFilters,
        clearSpecificFilters,
    }
}
