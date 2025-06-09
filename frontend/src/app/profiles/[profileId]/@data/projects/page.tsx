import React, {Suspense} from "react";
import {ProjectCardSkeletonGrid} from "@/features/projects/components/showcase/skeleton/ProjectSkeleton";
import UserProjectsGrid from "@/features/profile/component/projects/UserProjectsGrid";


export default async function UserProjectListPage({
    params
                                            }: {
    params: Promise<{profileId: string}>
}) {
    const { profileId} = await params;
    return(
        <Suspense fallback={<ProjectCardSkeletonGrid />}>
           <UserProjectsGrid profileId={profileId} />
        </Suspense>
    )
}
