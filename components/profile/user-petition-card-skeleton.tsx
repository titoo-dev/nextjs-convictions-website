import { Skeleton } from "../ui/skeleton";

export function UserPetitionCardSkeleton() {
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

			{/* Stats and actions skeleton */}
			<div className="flex items-center justify-between pt-2">
				<Skeleton className="h-4 w-24" />
				<div className="flex gap-2">
					<Skeleton className="h-8 w-8 rounded" />
					<Skeleton className="h-8 w-8 rounded" />
				</div>
			</div>
		</div>
	);
}
