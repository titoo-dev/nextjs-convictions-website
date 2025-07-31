import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SurveyDetailSkeleton() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
				<div className="mb-4 sm:mb-6">
					<Skeleton className="h-6 w-16" />
				</div>

				<Card className="shadow-none mb-6">
					<CardHeader>
						<Skeleton className="h-8 w-3/4 mb-2" />
						<div className="flex items-center gap-4 mb-4">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-4 w-20" />
						</div>
						<Skeleton className="h-20 w-full" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-48 w-full rounded-lg mb-6" />
						<div className="space-y-4">
							{[1, 2, 3, 4].map((i) => (
								<Card key={i} className="p-4">
									<div className="flex justify-between items-center mb-2">
										<Skeleton className="h-5 w-1/2" />
										<Skeleton className="h-5 w-16" />
									</div>
									<Skeleton className="h-2 w-full" />
								</Card>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
