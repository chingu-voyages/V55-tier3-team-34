import React from 'react'
import { Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {useTeammateSelection} from "@/features/projects/hooks/useTeammateSelection";
import {useTeammateSearch} from "@/features/projects/hooks/useTeammateSearch";
import {SearchInput} from "@/features/projects/components/forms/tech_selection/SearchInput";
import {SearchResultsDropdown} from "@/features/projects/components/forms/team_selection/SearchResultDropdown";
import {ErrorDisplay} from "@/features/projects/components/ErrorDisplay";
import {SelectedTeammates} from "@/features/projects/components/forms/team_selection/SelectedTeammate";
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";
import {Control , FieldErrors , UseFormSetValue} from "react-hook-form";


interface TeamMembersSectionProps {
    values: ProjectSubmissionFormData;
    errors: FieldErrors<ProjectSubmissionFormData>;
    setValue: UseFormSetValue<ProjectSubmissionFormData>;
}

export const TeamMembersSection: React.FC<TeamMembersSectionProps> = ({
                                                                          values,
                                                                          errors,
                                                                          setValue
                                                                      }) => {
    const {
        searchTerm,
        setSearchTerm,
        showResults,
        selectedTeammates,
        selectedIds,
        addTeammate,
        removeTeammate,
        clearSearch,
        handleSearchFocus,
        handleSearchBlur
    } = useTeammateSelection({ values, setFieldValue: (field, value) => setValue(field, value) })

    const { data: searchResults, isLoading, error } = useTeammateSearch(searchTerm)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Team Members
                </CardTitle>
                <CardDescription>
                    Search and select your project teammates
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 min-h-24">
                <div className="relative">
                    <SearchInput
                        placeholder="Search your team member by email or name"
                        value={searchTerm}
                        onChange={setSearchTerm}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        onClear={clearSearch}
                    />
                    <SearchResultsDropdown
                        isVisible={showResults}
                        searchTerm={searchTerm}
                        isLoading={isLoading}
                        error={error}
                        results={searchResults}
                        selectedIds={selectedIds}
                        onSelectTeammate={addTeammate}
                    />
                </div>
                <SelectedTeammates
                    teammates={selectedTeammates}
                    onRemove={removeTeammate}
                />

                <ErrorDisplay error={errors.teammates?.message ?? ""} />
            </CardContent>
        </Card>
    )
}
