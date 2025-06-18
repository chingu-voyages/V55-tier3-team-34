import { Users, User } from 'lucide-react';
import React from "react";
import {getAvatarFallback , getDisplayName} from "@/utils/user-info";
import {UserProfile} from "@/types/server-response";
import {Project} from "@/features/projects/types/projects";
import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {no_profile} from "@/features/auth/components/dropdown/UserMenu";
import Link from "next/link";
import {navigationPaths} from "@/config/navigation";


interface ProjectContributorsProps {
    project: Project;
}

export const ProjectContributors: React.FC<ProjectContributorsProps> = ({ project }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Contributors</h3>
                <span className="text-sm text-gray-500">({project.contributors.length})</span>
            </div>
            <div className="space-y-3">
                {project.contributors.map((contrib, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <Link href={navigationPaths.profile(`${contrib.contributor.userId}`)} >
                            <UserAvatar src={contrib.contributor.avatarUrl ?? no_profile} fallback={getAvatarFallback(contrib as unknown as UserProfile)} />
                        </Link>

                        <div>
                            <p className="font-medium text-gray-900">
                                {getDisplayName(contrib.contributor as unknown as UserProfile)}
                            </p>
                            {contrib.role && (
                                <p className="text-sm text-gray-500">{contrib.role.name}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
