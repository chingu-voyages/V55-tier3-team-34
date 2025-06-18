import {notFound} from "next/navigation";
import {getOneProjectById} from "@/features/projects/api/get-one-project";
import {Project} from "@/features/projects/types/projects";
import {ProjectImage} from "@/features/projects/components/detail/ProjectImage";
import {ProjectHeader} from "@/features/projects/components/detail/ProjectHeader";
import {ProjectInfo} from "@/features/projects/components/detail/ProjectInfo";
import {ProjectOverview} from "@/features/projects/components/detail/ProjectOverview";
import {ProjectContributors} from "@/features/projects/components/detail/ProjectContributor";
import {ProjectTags} from "@/features/projects/components/detail/ProjectTags";
import {ProjectDescription} from "@/features/projects/components/detail/ProjectDescription";


type Params = Promise<{projectId: string}>


export default async function ProjectDetailPage({
                                                    params
                                                }: {
    params: Params
}) {
    const { projectId } = await params;
    if (!projectId) {
        notFound();
    }

    const [result, error] = await getOneProjectById(projectId);

    if (error || !result) {
        notFound();
    }

    const project = result.data as Project;

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ProjectHeader project={project} />
                        {project.mainImageUrl && (
                            <ProjectImage
                                imageUrl={project.mainImageUrl}
                                title={project.title}
                            />
                        )}
                        <ProjectDescription description={project.longDescription} />
                    </div>
                    <div className="space-y-6">
                        <ProjectOverview description={project.shortDescription} />
                        <ProjectContributors project={project} />
                        <ProjectTags project={project} />
                    </div>
                </div>
            </div>
        </div>
    );
}
