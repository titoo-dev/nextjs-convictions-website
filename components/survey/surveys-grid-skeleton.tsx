import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

type SurveysGridSkeletonProps = {
	count?: number;
};

function SurveyCardSkeleton() {
	return (
		<Card className="hover:shadow-lg transition-shadow duration-300">
			<CardHeader>
				<div className="flex items-center gap-3 mb-3">
					<Skeleton className="w-10 h-10 rounded-full" />
					<div className="flex gap-2">
						<Skeleton className="h-5 w-16 rounded-full" />
						<Skeleton className="h-5 w-20 rounded-full" />
					</div>
				</div>
				<div className="space-y-2">
					<Skeleton className="h-6 w-4/5" />
					<Skeleton className="h-6 w-3/5" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/5" />
				</div>
			</CardHeader>

			<CardContent>
				<div className="space-y-3 mb-6">
					{[1, 2].map((i) => (
						<div
							key={i}
							className="flex items-center justify-between"
						>
							<Skeleton className="h-4 w-2/3" />
							<div className="flex items-center gap-2 ml-3">
								<Skeleton className="w-16 h-2 rounded-full" />
								<Skeleton className="h-4 w-8" />
							</div>
						</div>
					))}
					<Skeleton className="h-4 w-24" />
				</div>

				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-8 w-20 rounded" />
				</div>
			</CardContent>
		</Card>
	);
}

export function SurveysGridSkeleton({ count = 6 }: SurveysGridSkeletonProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{Array.from({ length: count }).map((_, index) => (
				<SurveyCardSkeleton key={index} />
			))}
		</div>
	);
}
