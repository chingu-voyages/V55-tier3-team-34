export function UserCardSkeleton() {
    return (
        <div className="group rounded-xl border-0 bg-card/50 backdrop-blur-sm overflow-hidden animate-pulse">
            <div className="flex flex-col items-center p-8 space-y-4">
                <div className="relative">
                    <div className="h-20 w-20 bg-gray-300 rounded-full ring-2 ring-primary/10"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
            </div>
            <div className="pt-0 pb-6 px-8">
                <div className="w-full h-9 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    );
}
export function UserCardSkeletonGrid({ count = 8 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {Array.from({ length: count }, (_, index) => (
                <UserCardSkeleton key={index} />
            ))}
        </div>
    );
}
