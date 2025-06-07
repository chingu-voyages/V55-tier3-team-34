import {User} from "@/types/user";
import React from "react";
import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {no_profile} from "@/features/auth/components/dropdown/UserMenu";
import {getAvatarFallback , getDisplayName} from "@/utils/user-info";
import {Badge} from "@/components/ui/badge";
import {Plus} from "lucide-react";

interface SearchResultItemProps {
    teammate: User
    isSelected: boolean
    onSelect: () => void
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
                                                               teammate,
                                                               isSelected,
                                                               onSelect
                                                           }) => {
    return (
        <div
            onClick={!isSelected ? onSelect : undefined}
            className={`p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 ${
                isSelected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <UserAvatar src={teammate.avatarUrl ?? no_profile} fallback={getAvatarFallback(teammate)} />
                    <div>
                        <div className="font-medium text-sm">{getDisplayName(teammate)}</div>
                        <div className="text-xs text-muted-foreground">
                            {teammate.email && ` • ${teammate.email}`}
                        </div>
                    </div>
                </div>
                {isSelected ? (
                    <Badge variant="secondary" className="text-xs">
                        Added
                    </Badge>
                ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                )}
            </div>
        </div>
    )
}
