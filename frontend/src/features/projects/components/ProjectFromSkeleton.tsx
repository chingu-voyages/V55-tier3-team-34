export function ProjectFormSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <div className="h-8 bg-muted rounded-md w-64 mb-2 animate-pulse" />
                <div className="h-4 bg-muted rounded-md w-96 animate-pulse" />
            </div>
            <div className="space-y-8">
                {/* Project Info Skeleton */}
                <div className="border rounded-lg p-6">
                    <div className="h-6 bg-muted rounded-md w-48 mb-4 animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-10 bg-muted rounded-md animate-pulse" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-10 bg-muted rounded-md animate-pulse" />
                            <div className="h-10 bg-muted rounded-md animate-pulse" />
                        </div>
                    </div>
                </div>
                {/* Description Skeleton */}
                <div className="border rounded-lg p-6">
                    <div className="h-6 bg-muted rounded-md w-48 mb-4 animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-20 bg-muted rounded-md animate-pulse" />
                        <div className="h-32 bg-muted rounded-md animate-pulse" />
                    </div>
                </div>

                {/* Technologies Skeleton */}
                <div className="border rounded-lg p-6">
                    <div className="h-6 bg-muted rounded-md w-48 mb-4 animate-pulse" />
                    <div className="grid grid-cols-4 gap-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-12 bg-muted rounded-md animate-pulse" />
                        ))}
                    </div>
                </div>

                {/* Submit Button Skeleton */}
                <div className="flex justify-end">
                    <div className="h-10 bg-muted rounded-md w-32 animate-pulse" />
                </div>
            </div>
        </div>
    )
}
