import React from "react";
import {Label} from "@/components/ui/label";
import {SelectedTeammateCard} from "@/features/projects/components/forms/team_selection/SelectedTeammateCard";
import {User} from "@/types/user";

interface SelectedTeammatesProps {
    teammates: User[]
    onRemove: (id: number) => void
}

export const SelectedTeammates: React.FC<SelectedTeammatesProps> = ({
                                                                        teammates,
                                                                        onRemove
                                                                    }) => {
    if (teammates.length === 0) return null
    return (
        <div>
            <Label className="text-sm font-medium">
                Selected Teammates ({teammates.length}):
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {teammates.map((teammate) => (
                    <SelectedTeammateCard
                        key={teammate.userId}
                        teammate={teammate}
                        onRemove={() => onRemove(Number(teammate.userId))}
                    />
                ))}
            </div>
        </div>
    )
}
