import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { getSurveys } from '@/actions/get-surveys';
import { Suspense } from 'react';
import { SurveysGridSkeleton } from '@/components/survey/surveys-grid-skeleton';

async function SurveysContent() {
	const surveys = await getSurveys();

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{surveys.map((survey) => (
					<Card
						key={survey.id}
						className="hover:shadow-lg transition-shadow duration-300 overflow-hidden pt-0"
					>
						<div className="relative w-full h-48">
							{survey.pictureUrl ? (
								<Image
									src={survey.pictureUrl}
									alt={survey.question}
									fill
									className="object-cover"
								/>
							) : (
								<div className="w-full h-full bg-gray-50 flex items-center justify-center">
									<svg
										className="w-16 h-16 text-gray-300"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							)}
						</div>

						<CardHeader>
							<div className="flex items-center gap-3 mb-3">
								{survey.isAnswered && (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
										Answered
									</span>
								)}
								{survey.isMine && (
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
										My Survey
									</span>
								)}
							</div>
							<CardTitle className="text-xl leading-tight">
								{survey.question}
							</CardTitle>
							<CardDescription className="text-sm leading-relaxed">
								{survey.description}
							</CardDescription>
						</CardHeader>

						<CardContent>
							<div className="space-y-3 mb-6">
								{survey.options.slice(0, 2).map((option) => (
									<div
										key={option.id}
										className="flex items-center justify-between"
									>
										<span className="text-sm text-foreground truncate flex-1">
											{option.option}
										</span>
										<div className="flex items-center gap-2 ml-3">
											<div className="w-16 bg-muted rounded-full h-2">
												<div
													className="bg-primary h-2 rounded-full transition-all duration-500"
													style={{
														width: `${
															option.percentage ||
															0
														}%`,
													}}
												/>
											</div>
											<span className="text-xs text-muted-foreground min-w-fit">
												{option.percentage
													? `${option.percentage}%`
													: '0%'}
											</span>
										</div>
									</div>
								))}
								{survey.options.length > 2 && (
									<p className="text-xs text-muted-foreground">
										+{survey.options.length - 2} more
										options
									</p>
								)}
							</div>

							<div className="flex items-center justify-between">
								<div className="text-xs text-muted-foreground">
									{survey.surveyUserAnswersTotal} responses
								</div>
								<Button
									size="sm"
									className="bg-primary hover:bg-primary/90"
									asChild
								>
									<Link href={survey.urlSurvey}>
										View More
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{surveys.length === 0 && (
				<div className="text-center py-12">
					<div className="relative w-24 h-24 mx-auto mb-6 opacity-30">
						<Image
							src="/placeholder-survey.svg"
							alt="No surveys"
							fill
							className="object-contain"
						/>
					</div>
					<h3 className="text-lg font-medium text-foreground mb-2">
						No surveys available
					</h3>
					<p className="text-muted-foreground">
						Check back later for new community surveys
					</p>
				</div>
			)}
		</>
	);
}

export default async function SurveysPage() {
	const t = await getTranslations('navigation');

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-foreground mb-4">
						{t('surveys')}
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
						Share your voice through community surveys and help
						shape important decisions
					</p>
					<Button size="lg" asChild>
						<Link href="/surveys/new">Create Survey</Link>
					</Button>
				</div>

				<Suspense fallback={<SurveysGridSkeleton count={6} />}>
					<SurveysContent />
				</Suspense>
			</div>
		</div>
	);
}
