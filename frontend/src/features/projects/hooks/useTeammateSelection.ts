import {useState} from "react";
import {User} from "@/types/user";
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";

interface UseTeammateSelectionProps {
    values: any
    setFieldValue: (field: keyof ProjectSubmissionFormData, value: any) => void
}

export const useTeammateSelection = ({ values, setFieldValue }: UseTeammateSelectionProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [selectedTeammates, setSelectedTeammates] = useState<User[]>([])

    const selectedIds = values.teammates || []

    const addTeammate = (teammate:  User) => {
        if (!selectedIds.includes(teammate.userId)) {
            setFieldValue('teammates', [...selectedIds, teammate.userId])
            setSelectedTeammates((prevState) => [...prevState, teammate])
        }
        clearSearch()
    }

    const removeTeammate = (id: number) => {
        setFieldValue('teammates', selectedIds.filter((teamId: number) => teamId !== id))
        setSelectedTeammates((prevState) => prevState.filter(teammate => Number(teammate.userId) != id))
    }

    const clearSearch = () => {
        setSearchTerm('')
        setShowResults(false)
    }

    const handleSearchFocus = () => setShowResults(true)
    const handleSearchBlur = () => setTimeout(() => setShowResults(false), 200)

    return {
        searchTerm,
        setSearchTerm,
        showResults,
        selectedIds,
        addTeammate,
        removeTeammate,
        selectedTeammates,
        clearSearch,
        handleSearchFocus,
        handleSearchBlur
    }
}
