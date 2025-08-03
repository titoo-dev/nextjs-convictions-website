import { getSurvey } from '@/actions/get-survey';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Calendar, User, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

export async function SurveyDetail({ id }: { id: string }) {
	const survey = await getSurvey(id);

	console.log(survey);

	if (!survey) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center px-4">
				<Card className="max-w-md w-full border-0 shadow-none">
					<CardContent className="text-center py-8">
						<div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
							<BarChart3 className="w-6 h-6 text-muted-foreground" />
						</div>
						<h2 className="text-lg font-bold text-foreground mb-2">
							Survey Not Found
						</h2>
						<p className="text-muted-foreground mb-6 text-sm">
							The survey you&apos;re looking for doesn&apos;t
							exist or has been removed.
						</p>
						<Link href="/">
							<Button size="sm" className="gap-2">
								<ArrowLeft className="w-3 h-3" />
								Back to Home
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const totalVotes = survey.options.reduce(
		(sum, option) => sum + option.count,
		0
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
			<div className="container mx-auto px-4 py-6 max-w-4xl">
				<div className="mb-6">
					<Link
						href="/surveys"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
					>
						<ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
						<span className="text-sm font-medium">
							Back to Surveys
						</span>
					</Link>
				</div>

				<div className="grid gap-6">
					<Card className="border-0 shadow-none bg-card/80 backdrop-blur-sm">
						<CardHeader className="pb-4">
							<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
								<div className="flex-1 space-y-3">
									<CardTitle className="text-xl lg:text-2xl font-bold leading-tight">
										{survey.question}
									</CardTitle>

									<div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
										{survey.author && (
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
													<User className="w-3 h-3" />
												</div>
												<span className="font-medium">
													{survey.author.name}
												</span>
											</div>
										)}
										<div className="flex items-center gap-2">
											<Calendar className="w-3 h-3" />
											<span>
												{formatDate(survey.createdAt)}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Users className="w-3 h-3" />
											<span className="font-medium">
												{totalVotes} responses
											</span>
										</div>
									</div>

									{survey.description && (
										<p className="text-muted-foreground leading-relaxed text-sm">
											{survey.description}
										</p>
									)}
								</div>

								<div className="flex flex-wrap lg:flex-col gap-2">
									<Badge
										variant={
											survey.isAnswered
												? 'default'
												: 'secondary'
										}
										className="text-xs"
									>
										{survey.isAnswered
											? 'Answered'
											: 'Not Answered'}
									</Badge>
									{survey.isMultipleChoice && (
										<Badge
											variant="outline"
											className="text-xs"
										>
											Multiple Choice
										</Badge>
									)}
									{survey.isMine && (
										<Badge
											variant="outline"
											className="text-xs bg-primary/5"
										>
											Your Survey
										</Badge>
									)}
								</div>
							</div>
						</CardHeader>

						<CardContent className="space-y-6">
							{survey.pictureUrl && (
								<div className="relative w-full h-60 rounded-lg overflow-hidden bg-muted shadow-md">
									<Image
										src={survey.pictureUrl}
										alt="Survey image"
										fill
										className="object-cover"
									/>
								</div>
							)}

							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<BarChart3 className="w-4 h-4 text-primary" />
									</div>
									<h3 className="text-lg font-bold">
										Poll Results
									</h3>
									<div className="flex-1 h-px bg-border"></div>
								</div>

								{totalVotes > 0 ? (
									<div className="grid gap-3">
										{survey.options.map((option) => (
											<Card
												key={option.id}
												className="p-4 border-0 bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
											>
												<div className="space-y-3">
													<div className="flex justify-between items-start gap-4">
														<span className="font-semibold text-foreground leading-tight">
															{option.option}
														</span>
														<div className="flex flex-col items-end gap-1 min-w-0">
															<span className="text-xs font-bold text-foreground">
																{option.count}{' '}
																{option.count ===
																1
																	? 'vote'
																	: 'votes'}
															</span>
															<span className="text-xs text-muted-foreground font-medium">
																{option.percentage?.toFixed(
																	1
																) || 0}
																%
															</span>
														</div>
													</div>
													<div className="relative">
														<Progress
															value={
																option.percentage ||
																0
															}
															className="h-2 bg-background"
														/>
													</div>
												</div>
											</Card>
										))}
									</div>
								) : (
									<div className="text-center py-12">
										<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
											<Users className="w-8 h-8 text-muted-foreground" />
										</div>
										<h4 className="text-lg font-semibold text-foreground mb-2">
											No responses yet
										</h4>
										<p className="text-muted-foreground text-sm">
											Be the first to share your opinion!
										</p>
									</div>
								)}
							</div>
							<div className="text-center">
								<Link href={`/surveys/${survey.id}/take`}>
									<Button
										size="default"
										className="px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
									>
										Take Survey
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
