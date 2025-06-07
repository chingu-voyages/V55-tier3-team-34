import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {User} from "@/types/user";
import {no_profile} from "@/features/auth/components/dropdown/UserMenu";
import {getAvatarFallback , getDisplayName} from "@/utils/user-info";

interface SelectedTeammateCardProps {
    teammate: User
    onRemove: () => void
}

export const SelectedTeammateCard: React.FC<SelectedTeammateCardProps> = ({
                                                                       teammate,
                                                                       onRemove
                                                                   }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg border">
            <div className="flex items-center space-x-3">
                <UserAvatar src={teammate.avatarUrl ?? no_profile} fallback={getAvatarFallback(teammate)} />
                <div>
                    <div className="font-medium text-sm">{getDisplayName(teammate)}</div>
                </div>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="flex justify-center items-center"
            >
                <X  />
            </Button>
        </div>
    )
}
