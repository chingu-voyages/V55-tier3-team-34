import React , {Suspense} from 'react'
import {ProjectGrid} from "@/features/projects/components/showcase/ProjectGrid";
import {MayBe} from "@/utils/type";
import {
    ProjectCardSkeletonGrid ,
} from "@/features/projects/components/showcase/skeleton/ProjectSkeleton";




export enum SortEnum {DESC="desc", ASC="asc"}

type Params = Promise<{ search: MayBe<string>, tier: MayBe<string>, sort: MayBe<SortEnum> }>

type SearchParams = Promise<{ search?: string, tier?: string, sort?: SortEnum }>

export default async function ExplorePage({
                                              searchParams
                                          }: {
    searchParams: SearchParams
}) {
    const { search, tier, sort } = await searchParams
    const filterOptions = {
        search,
        tier,
        sort
    }
    return (
        <Suspense fallback={<ProjectCardSkeletonGrid />}>
            <ProjectGrid filterOptions={filterOptions} />
        </Suspense>
    )
}
