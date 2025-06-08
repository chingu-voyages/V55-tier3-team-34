import React , {Suspense} from 'react'
import {ProjectGrid} from "@/features/projects/components/showcase/ProjectGrid";
import {MayBe} from "@/utils/type";
import {
    ProjectCardSkeletonGrid ,
} from "@/features/projects/components/showcase/skeleton/ProjectSkeleton";




export enum SortEnum {DESC="desc", ASC="asc"}

type Params = Promise<{ search: MayBe<string>, tier: MayBe<string>, sort: MayBe<SortEnum> }>

export default async function ExplorePage({
    params
                                          }: {
    params: Params
}) {
    const { search, sort, tier} = await params
    const filterOptions = {
        search,
        tier
    }
    return (
        <Suspense fallback={<ProjectCardSkeletonGrid />}>
            <ProjectGrid filterOptions={filterOptions} />
        </Suspense>
    )
}
