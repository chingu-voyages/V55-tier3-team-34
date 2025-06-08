import React , {Suspense} from "react";
import {VoyagerGrid} from "@/features/profile/component/voyager/VoyagerGrid";
import {UserCardSkeletonGrid} from "@/features/profile/component/voyager/skeleton/VoyagerSkeleton";




export default async function VoyagerListPage() {
    return(
        <Suspense fallback={<UserCardSkeletonGrid />}>
            <VoyagerGrid />
        </Suspense>
    )
}


