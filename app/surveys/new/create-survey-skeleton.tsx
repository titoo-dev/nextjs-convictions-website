import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CreateSurveySkeleton() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
				<div className="mb-4 sm:mb-6">
					<Skeleton className="h-6 w-20" />
				</div>

				<Card className="shadow-none">
					<CardHeader>
						<Skeleton className="h-8 w-48 mb-2" />
						<Skeleton className="h-4 w-64" />
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-10 w-full" />
							</div>

							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-24 w-full" />
							</div>

							<div className="space-y-2">
								<Skeleton className="h-4 w-36" />
								<Skeleton className="h-32 w-full" />
							</div>

							<div className="space-y-4">
								<Skeleton className="h-4 w-32" />
								<div className="space-y-3">
									{[1, 2].map((i) => (
										<Card
											key={i}
											className="p-3 rounded-sm shadow-none"
										>
											<div className="flex items-center gap-3">
												<Skeleton className="h-10 flex-1" />
												<Skeleton className="h-10 w-10" />
											</div>
										</Card>
									))}
								</div>
								<Skeleton className="h-10 w-32" />
							</div>

							<div className="flex items-center space-x-2">
								<Skeleton className="h-6 w-6" />
								<Skeleton className="h-4 w-40" />
							</div>

							<Skeleton className="h-12 w-full" />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
