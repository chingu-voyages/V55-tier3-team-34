import {useCallback , useEffect , useState} from "react";
import {Tag} from "@/features/projects/constants/project-data";
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";

interface UseSelectedTagsProps {
    tags?: Tag[];
    selectedTagIds: number[];
    setFieldValue: (field: keyof ProjectSubmissionFormData, value: number[]) => void;
}

export const useSelectedTags = ({ tags, selectedTagIds, setFieldValue }: UseSelectedTagsProps) => {

    const [selectedTagsCache, setSelectedTagsCache] = useState<Map<number, Tag>>(new Map());
    const selectedTags = Array.from(selectedTagsCache.values());

    useEffect(() => {
        if (tags && selectedTagIds) {
            setSelectedTagsCache(prevCache => {
                const newCache = new Map(prevCache);
                tags.forEach(tag => {
                    if (selectedTagIds.includes(tag.tagId) && !newCache.has(tag.tagId)) {
                        newCache.set(tag.tagId, tag);
                    }
                });
                return newCache;
            });
        }
    }, [tags, selectedTagIds]);

    const handleToggleTag = useCallback((tagId: number) => {
        const isCurrentlySelected = selectedTagIds.includes(tagId);
        const newTagIds = isCurrentlySelected
            ? selectedTagIds.filter(id => id !== tagId)
            : [...selectedTagIds, tagId];

        setFieldValue('tags', newTagIds);

        if (isCurrentlySelected) {
            setSelectedTagsCache(prev => {
                const newCache = new Map(prev);
                newCache.delete(tagId);
                return newCache;
            });
        } else {
            const tagToAdd = tags?.find(tag => tag.tagId === tagId);
            if (tagToAdd) {
                setSelectedTagsCache(prev => {
                    const newCache = new Map(prev);
                    newCache.set(tagId, tagToAdd);
                    return newCache;
                });
            }
        }
    }, [selectedTagIds, setFieldValue, tags]);

    const handleRemoveTag = useCallback((tagId: number) => {
        const newTagIds = selectedTagIds.filter(id => id !== tagId);
        setFieldValue('tags', newTagIds);
        setSelectedTagsCache(prev => {
            const newCache = new Map(prev);
            newCache.delete(tagId);
            return newCache;
        });
    }, [selectedTagIds, setFieldValue]);

    return {
        selectedTags,
        handleToggleTag,
        handleRemoveTag
    };
};
