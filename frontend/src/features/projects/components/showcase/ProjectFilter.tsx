"use client"
import React , {useEffect , useState} from "react";

import {TIERS} from "@/features/projects/constants/project-data";
import {Select , SelectContent , SelectItem , SelectTrigger , SelectValue} from "@/components/ui/select";
import {useUrlFilters} from "@/hooks/useUpdateFilter";


export default function ProjectFilter() {
    const {getFilter, updateFilter} = useUrlFilters()
    const currentTier = Number(getFilter('tier') || "0" );
    const [selectedTier, setSelectedTier] = useState(currentTier)
    const tiers = ["All Tiers", ...TIERS]

    useEffect(() => {
        updateFilter("tier", selectedTier)
    }, [selectedTier])
    return(
        <div className="flex gap-4">
            <Select  onValueChange={(value) => setSelectedTier(Number(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                    {tiers.map((tier ) => {
                        const key = typeof tier == 'string' ? tier : tier.label
                        const value = typeof tier == 'string' ? 0: tier.value
                        return (
                            <SelectItem key={key} value={String(value)}>
                                {key}
                            </SelectItem>)
                    })}
                </SelectContent>
            </Select>
        </div>

    )
}
