import React , {Suspense} from 'react'
import {ProjectGrid} from "@/features/projects/components/showcase/ProjectGrid";
import {
    ProjectCardSkeletonGrid ,
} from "@/features/projects/components/showcase/skeleton/ProjectSkeleton";




enum SortEnum {
    DESC = "desc",
    ASC = "asc"
}


export default async function ExplorePage({ searchParams }: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const {search, tier, sort} = await searchParams
    const filterOptions = {
        search: search as string,
        tier: tier as string,
        sort: sort as SortEnum,
    };
    return (
        <Suspense fallback={<ProjectCardSkeletonGrid />}>
            <ProjectGrid filterOptions={filterOptions} />
        </Suspense>
    );
}
