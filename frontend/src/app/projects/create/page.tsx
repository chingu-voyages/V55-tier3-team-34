import ProjectSubmissionForm from "@/features/projects/components/forms/ProjectSubmissionForm";
import {Suspense} from "react";
import {ProjectFormSkeleton} from "@/features/projects/components/ProjectFromSkeleton";
import {Metadata} from "next";
import {
    Breadcrumb ,
    BreadcrumbItem ,
    BreadcrumbLink ,
    BreadcrumbList , BreadcrumbPage ,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {HomeIcon} from "lucide-react";

export const metadata: Metadata = {
    title: 'Create New Project | Chingu',
    description: 'Submit your amazing project to the Chingu community and showcase your work to fellow developers.',
    keywords: ['project submission', 'chingu', 'developer community', 'portfolio', 'coding project'],
    openGraph: {
        title: 'Create New Project | Chingu',
        description: 'Submit your amazing project to the Chingu community and showcase your work to fellow developers.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Create New Project | Chingu',
        description: 'Submit your amazing project to the Chingu community',
    }
}

export default function CreateProjectPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/"><HomeIcon /></BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Projects</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Create Project</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <main className="py-8">
                <Suspense fallback={<ProjectFormSkeleton />}>
                    <ProjectSubmissionForm />
                </Suspense>
            </main>
        </div>
    )
}
