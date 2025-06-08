

export function ProjectCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="relative h-48 bg-gray-300"></div>
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 mr-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                </div>
                <div className="mb-4">
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/5 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/5"></div>
                </div>
                <div className="mb-4">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
                        <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
                        <div className="h-6 w-14 bg-gray-300 rounded-md"></div>
                        <div className="h-6 w-18 bg-gray-300 rounded-md"></div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="h-4 bg-gray-300 rounded w-28 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="flex gap-3">
                    <div className="flex-1 h-10 bg-gray-300 rounded-md"></div>
                    <div className="flex-1 h-10 bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}

export function ProjectCardSkeletonGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {Array.from({ length: 6 }, (_, index) => (
                <ProjectCardSkeleton key={index} />
            ))}
        </div>
    );
}

