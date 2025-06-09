import React , {Suspense} from "react";
import {ProjectSearch} from "@/features/projects/components/showcase/ProjectSearch";
import ProjectFilter from "@/features/projects/components/showcase/ProjectFilter";



export default function ExploreLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
          <div className="w-full p-4">
              <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Showcase</h1>
                  <p className="text-gray-600">Explore amazing projects built by Chingu participants from around the world</p>
              </div>
              <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                  <ProjectSearch />
                  <ProjectFilter />
              </div>
              <Suspense>
                  { children}
              </Suspense>
          </div>
    );
}
