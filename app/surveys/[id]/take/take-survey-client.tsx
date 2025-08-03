'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Survey } from '@/schemas/survey';
import { useState, useTransition } from 'react';
import { createUserAnswer } from '@/actions/create-user-answer';
import { toast } from 'sonner';
import { RenderWhen } from '@/components/render-when';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type TakeSurveyClientProps = {
	survey: Survey;
};

export function TakeSurveyClient({ survey }: TakeSurveyClientProps) {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleOptionToggle = (optionId: string) => {
		if (survey.isAnswered) return;

		if (survey.isMultipleChoice) {
			setSelectedOptions((prev) =>
				prev.includes(optionId)
					? prev.filter((id) => id !== optionId)
					: [...prev, optionId]
			);
		} else {
			setSelectedOptions([optionId]);
		}
	};

	const handleSubmitVote = () => {
		if (selectedOptions.length === 0) return;

		startTransition(async () => {
			const result = await createUserAnswer({
				optionSelectedIds: selectedOptions,
				surveyId: survey.id,
			});

			if (result.success) {
				setSelectedOptions([]);
				toast.success('Vote submitted successfully');
				router.refresh();
			} else {
				toast.error(result.error || 'Failed to submit vote');
			}
		});
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<Card className="overflow-hidden pt-0 shadow-none">
					<RenderWhen condition={!!survey.pictureUrl}>
						<div className="relative w-full h-64">
							<Image
								src={survey.pictureUrl || ''}
								alt={survey.question}
								fill
								className="object-cover"
							/>
						</div>
					</RenderWhen>

					<CardHeader>
						<div className="flex items-center gap-3 mb-4">
							<RenderWhen condition={survey.isAnswered}>
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-800"
								>
									Answered
								</Badge>
							</RenderWhen>
							<RenderWhen condition={survey.isMine}>
								<Badge
									variant="secondary"
									className="bg-blue-100 text-blue-800"
								>
									My Survey
								</Badge>
							</RenderWhen>
							<RenderWhen condition={survey.isMultipleChoice}>
								<Badge variant="outline">Multiple Choice</Badge>
							</RenderWhen>
						</div>

						<CardTitle className="text-2xl leading-tight">
							{survey.question}
						</CardTitle>
						<CardDescription className="text-base leading-relaxed">
							{survey.description}
						</CardDescription>

						<RenderWhen condition={!!survey.author}>
							<div className="flex items-center gap-3 pt-4 border-t">
								<div className="relative w-8 h-8 rounded-full overflow-hidden">
									<Image
										src={survey.author?.pictureUrl || ''}
										alt={survey.author?.name || ''}
										fill
										className="object-cover"
									/>
								</div>
								<span className="text-sm text-muted-foreground">
									by {survey.author?.name}
								</span>
							</div>
						</RenderWhen>
					</CardHeader>

					<CardContent>
						<div className="space-y-4">
							<div className="space-y-3">
								{survey.options.map((option) => {
									const isSelected = selectedOptions.includes(
										option.id
									);

									return (
										<div
											key={option.id}
											className="space-y-2"
										>
											<div
												className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
													isSelected
														? 'border-primary bg-primary/5'
														: 'border-gray-200 hover:border-gray-300'
												} ${
													survey.isAnswered ||
													isPending
														? 'cursor-default opacity-75'
														: ''
												}`}
												onClick={() =>
													handleOptionToggle(
														option.id
													)
												}
											>
												{survey.isMultipleChoice ? (
													<Checkbox
														checked={isSelected}
														disabled={
															survey.isAnswered ||
															isPending
														}
													/>
												) : (
													<div
														className={`w-4 h-4 rounded-full border-2 ${
															isSelected
																? 'border-primary bg-primary'
																: 'border-gray-300'
														}`}
													>
														{isSelected && (
															<div className="w-full h-full rounded-full bg-white scale-50"></div>
														)}
													</div>
												)}

												<div className="flex-1">
													<span className="text-sm font-medium">
														{option.option}
													</span>
												</div>

												<RenderWhen
													condition={
														survey.isAnswered
													}
												>
													<div className="flex items-center gap-2">
														<Badge
															variant="secondary"
															className="text-xs"
														>
															{option.count}{' '}
															{option.count === 1
																? 'vote'
																: 'votes'}
														</Badge>
														<span className="text-xs text-muted-foreground">
															{option.percentage}%
														</span>
													</div>
												</RenderWhen>
											</div>

											<RenderWhen
												condition={survey.isAnswered}
											>
												<div className="w-full bg-gray-200 rounded-full h-2 ml-7">
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
											</RenderWhen>
										</div>
									);
								})}
							</div>

							<div className="pt-4 border-t">
								<div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
									<span>
										{survey.surveyUserAnswersTotal} total
										responses
									</span>
									<span>
										Created{' '}
										{new Date(
											survey.createdAt
										).toLocaleDateString()}
									</span>
								</div>

								<RenderWhen
									condition={
										!survey.isAnswered &&
										selectedOptions.length > 0
									}
								>
									<Button
										className="w-full"
										size="lg"
										onClick={handleSubmitVote}
										disabled={isPending}
									>
										{isPending
											? 'Submitting...'
											: 'Submit Vote'}
									</Button>
								</RenderWhen>

								<RenderWhen condition={survey.isAnswered}>
									<div className="text-center p-4 bg-green-50 rounded-lg">
										<p className="text-green-800 font-medium">
											You have already answered this
											survey
										</p>
									</div>
								</RenderWhen>

								<RenderWhen
									condition={
										!survey.isAnswered &&
										selectedOptions.length === 0
									}
								>
									<div className="text-center p-4 bg-gray-50 rounded-lg">
										<p className="text-gray-600">
											Select{' '}
											{survey.isMultipleChoice
												? 'one or more options'
												: 'an option'}{' '}
											to vote
										</p>
									</div>
								</RenderWhen>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
