import { Skeleton } from "../ui/skeleton";

type PetitionGridSkeletonProps = {
    count?: number;
};

function PetitionCardSkeleton() {
    return (
        <div className="flex flex-col h-full space-y-4 p-4">
            {/* Media skeleton */}
            <Skeleton className="w-full h-48" />
            
            {/* Title skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-3/5" />
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Stats skeleton */}
            <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>
        </div>
    );
}

export function PetitionGridSkeleton({ count = 6 }: PetitionGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <PetitionCardSkeleton key={index} />
            ))}
        </div>
    );
}