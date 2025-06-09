import React , {useState} from 'react'
import {Loader2 , Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {useTags} from "@/features/projects/hooks/useTags";
import {AvailableTechnologies} from "@/features/projects/components/forms/tech_selection/AvailableTech";
import {SelectedTags} from "@/features/projects/components/forms/tech_selection/SelectedTag";
import {SearchInput} from "@/features/projects/components/forms/tech_selection/SearchInput";
import {SearchTips} from "@/features/projects/components/forms/tech_selection/SearchTips";
import {useSelectedTags} from "@/hooks/useSelectedTags";
import {ErrorDisplay} from "@/features/projects/components/ErrorDisplay";
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";
import {FieldErrors , UseFormSetValue} from "react-hook-form";




interface Tag {
    tagId: number;
    name: string;
}

interface TechnologiesSectionProps {
    values: ProjectSubmissionFormData
    errors: FieldErrors<ProjectSubmissionFormData>
    setValue: UseFormSetValue<ProjectSubmissionFormData>;
}
export const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({
                                                                            values,
                                                                            errors,
                                                                            setValue
                                                                        }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [showAllTags, setShowAllTags] = useState(false)

    const { data: tags, isLoading: loading, error } = useTags(searchTerm)

    const { selectedTags, handleToggleTag, handleRemoveTag } = useSelectedTags({
        tags,
        selectedTagIds: values.tags as number[],
        setFieldValue: (field, value) => setValue(field, value)
    })

    const handleClearSearch = () => setSearchTerm('')
    const handleToggleShowAll = () => setShowAllTags(!showAllTags)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Technologies Used
                </CardTitle>
                <CardDescription>
                    Search and select the technologies and tools used in your project
                </CardDescription>
                <SearchInput
                    placeholder="Search technologies (e.g., React, Python, Docker...)"
                    value={searchTerm}
                    onChange={setSearchTerm}
                    onClear={handleClearSearch}
                />
            </CardHeader>

            <CardContent className="space-y-6">
                {loading && <LoadingState />}
                {error && <ErrorDisplay error={error} />}

                {tags && (
                    <>
                        <SelectedTags
                            selectedTags={selectedTags}
                            onRemove={handleRemoveTag}
                        />
                        <AvailableTechnologies
                            filteredTags={tags}
                            selectedTagIds={values.tags as number[]}
                            onToggle={handleToggleTag}
                            searchTerm={searchTerm}
                            showAllTags={showAllTags}
                            totalTagsCount={tags.length}
                            onToggleShowAll={handleToggleShowAll}
                        />
                        {!searchTerm && tags.length > 0 && <SearchTips />}
                    </>
                )}

                {errors.tags && <ErrorDisplay error={errors.tags?.message ?? ""} />}
            </CardContent>
        </Card>
    )
}

const LoadingState: React.FC = () => (
    <div className="flex items-center justify-center py-1">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading technologies...</span>
    </div>
)
