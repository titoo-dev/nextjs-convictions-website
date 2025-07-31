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
import { Survey } from '@/schemas/survey';

async function getSurveys(): Promise<Survey[]> {
	const surveys: Survey[] = [
		{
			id: '1',
			question: 'Climate Change Awareness',
			description:
				'How important is environmental protection in your daily decisions? Share your perspective on climate action.',
			options: [
				{
					id: '1',
					option: 'Very important',
					count: 245,
					percentage: 45.2,
				},
				{
					id: '2',
					option: 'Somewhat important',
					count: 178,
					percentage: 32.8,
				},
				{
					id: '3',
					option: 'Not important',
					count: 119,
					percentage: 22.0,
				},
			],
			isMultipleChoice: false,
			isAnswered: false,
			isMine: false,
			surveyUserAnswersTotal: 542,
			createdAt: '2024-01-15T10:30:00Z',
			pictureUrl: null,
			urlSurvey: '/surveys/climate-change-awareness',
			author: 'Environmental Coalition',
			idSeq: 1,
		},
		{
			id: '2',
			question: 'Education System Reform',
			description:
				'What aspects of education need the most improvement? Help us understand community priorities.',
			options: [
				{
					id: '1',
					option: 'Teacher training',
					count: 312,
					percentage: 38.5,
				},
				{
					id: '2',
					option: 'Technology integration',
					count: 201,
					percentage: 24.8,
				},
				{
					id: '3',
					option: 'Curriculum modernization',
					count: 298,
					percentage: 36.7,
				},
			],
			isMultipleChoice: true,
			isAnswered: true,
			isMine: true,
			surveyUserAnswersTotal: 811,
			createdAt: '2024-01-10T14:20:00Z',
			pictureUrl: null,
			urlSurvey: '/surveys/education-system-reform',
			author: 'Education Reform Group',
			idSeq: 2,
		},
		{
			id: '3',
			question: 'Public Transportation Priorities',
			description:
				'Which transportation improvements would benefit your community most? Your input shapes future infrastructure.',
			options: [
				{
					id: '1',
					option: 'More bus routes',
					count: 156,
					percentage: 28.1,
				},
				{
					id: '2',
					option: 'Better accessibility',
					count: 189,
					percentage: 34.0,
				},
				{
					id: '3',
					option: 'Extended hours',
					count: 210,
					percentage: 37.9,
				},
			],
			isMultipleChoice: false,
			isAnswered: false,
			isMine: false,
			surveyUserAnswersTotal: 555,
			createdAt: '2024-01-08T09:45:00Z',
			pictureUrl: null,
			urlSurvey: '/surveys/public-transportation-priorities',
			author: 'Transit Authority',
			idSeq: 3,
		},
	];
	return surveys;
}

export default async function SurveysPage() {
	const t = await getTranslations('navigation');
	const surveys = await getSurveys();

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

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{surveys.map((survey) => (
						<Card
							key={survey.id}
							className="hover:shadow-lg transition-shadow duration-300"
						>
							<CardHeader>
								<div className="flex items-center gap-3 mb-3">
									<div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center">
										<svg
											className="w-5 h-5 text-primary-foreground"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
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
									{survey.options
										.slice(0, 2)
										.map((option) => (
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
										{survey.surveyUserAnswersTotal}{' '}
										responses
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
			</div>
		</div>
	);
}
