import { Skeleton } from '../ui/skeleton';

export function EditPetitionSkeleton() {
	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="mb-6">
					<Skeleton className="h-6 w-24" />
				</div>

				<div className="mb-4">
					<div className="flex items-center justify-between mb-4">
						<Skeleton className="h-9 w-64" />
					</div>

					<div className="flex items-center space-x-4 mb-6">
						{Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="flex items-center">
								<Skeleton className="h-10 w-10 rounded-full" />
								{i < 5 && (
									<Skeleton className="h-1 w-16 mx-2" />
								)}
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-between mb-6">
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-10 w-24" />
				</div>

				<div className="mb-8 bg-white rounded-lg border">
					<div className="p-6 space-y-6">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-32 w-full" />
						<div className="flex space-x-4">
							<Skeleton className="h-10 w-32" />
							<Skeleton className="h-10 w-32" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
