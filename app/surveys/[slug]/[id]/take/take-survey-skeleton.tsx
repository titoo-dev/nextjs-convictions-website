import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function TakeSurveySkeleton() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<Card className="overflow-hidden">
					<div className="relative w-full h-64">
						<Skeleton className="w-full h-full" />
					</div>

					<CardHeader>
						<div className="flex items-center gap-3 mb-4">
							<Skeleton className="h-6 w-20" />
							<Skeleton className="h-6 w-24" />
						</div>

						<Skeleton className="h-8 w-3/4 mb-2" />
						<Skeleton className="h-4 w-full mb-2" />
						<Skeleton className="h-4 w-2/3" />

						<div className="flex items-center gap-3 pt-4 border-t">
							<Skeleton className="w-8 h-8 rounded-full" />
							<Skeleton className="h-4 w-32" />
						</div>
					</CardHeader>

					<CardContent>
						<div className="space-y-4">
							<div className="space-y-3">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="p-4 rounded-lg border-2"
									>
										<div className="flex items-center space-x-3">
											<Skeleton className="w-4 h-4 rounded-full" />
											<Skeleton className="h-5 flex-1" />
										</div>
									</div>
								))}
							</div>

							<div className="pt-4 border-t">
								<div className="flex items-center justify-between mb-4">
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-4 w-24" />
								</div>
								<Skeleton className="h-12 w-full" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
