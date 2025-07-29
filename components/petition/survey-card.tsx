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
import { Survey } from '@/schemas/survey';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { createUserAnswer } from '@/actions/create-user-answer';
import { toast } from 'sonner';

type SurveyCardProps = {
	survey: Survey;
};

import { RenderWhen } from '@/components/render-when';

export function SurveyCard({ survey }: SurveyCardProps) {
	const t = useTranslations('petition.survey');
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleVote = (optionId: string) => {
		if (!survey.isAnswered) {
			setSelectedOption(optionId);
		}
	};

	const handleSubmitVote = () => {
		if (!selectedOption) return;

		startTransition(async () => {
			const result = await createUserAnswer({
				optionSelectedIds: [selectedOption],
				surveyId: survey.id,
			});

			if (result.success) {
				setSelectedOption(null);
				toast.success(t('voteSubmitted'));
			} else {
				toast.error(result.error || t('voteFailed'));
			}
		});
	};

	return (
		<Card className="shadow-none">
			<CardHeader className="pb-3">
				<CardTitle className="text-base sm:text-lg flex items-center">
					{survey.title}
				</CardTitle>
				<CardDescription className="text-xs sm:text-sm text-gray-600 leading-relaxed">
					{survey.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="p-4 pt-0">
				<div className="space-y-4">
					<div className="space-y-2">
						{survey.options.map((option, index) => {
							const isSelected = selectedOption === option.id;

							return (
								<div key={index} className="space-y-1">
									<Button
										variant={
											isSelected ? 'default' : 'outline'
										}
										className={`w-full justify-between text-left h-auto p-3 ${
											survey.isAnswered || isPending
												? 'cursor-default border-none shadow-none'
												: 'cursor-pointer'
										}`}
										onClick={() => handleVote(option.id)}
										disabled={
											survey.isAnswered || isPending
										}
									>
										<div className="flex-1">
											<span className="text-xs sm:text-sm">
												{option.option}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<RenderWhen
												condition={survey.isAnswered}
											>
												<Badge
													variant="secondary"
													className="text-xs"
												>
													{option.count}{' '}
													{option.count === 1
														? t('vote')
														: t('votes')}
												</Badge>
											</RenderWhen>
										</div>
									</Button>

									<RenderWhen condition={survey.isAnswered}>
										<div className="w-full bg-gray-200 rounded-full h-1">
											<div
												className="bg-green-600 h-1 rounded-full transition-all duration-300"
												style={{
													width: `${option.percentage}%`,
												}}
											/>
										</div>
									</RenderWhen>
								</div>
							);
						})}
					</div>

					<RenderWhen
						condition={
							!survey.isAnswered && selectedOption !== null
						}
					>
						<Button
							className="w-full hover:bg-gray-300 hover:text-gray-800 hover:cursor-pointer"
							size="sm"
							variant="secondary"
							onClick={handleSubmitVote}
							disabled={isPending}
						>
							{isPending ? t('submitting') : t('submitVote')}
						</Button>
					</RenderWhen>
				</div>
			</CardContent>
		</Card>
	);
}
