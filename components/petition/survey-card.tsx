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
import { useState } from 'react';

type SurveyCardProps = {
	survey: Survey;
};

export function SurveyCard({ survey }: SurveyCardProps) {
	const t = useTranslations('petition.survey');
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const totalVotes = survey.options.reduce(
		(sum, option) => sum + option.count,
		0
	);

	const handleVote = (optionId: string) => {
		if (!survey.isAnswered) {
			setSelectedOption(optionId);
			console.log('Voting for:', optionId);
		}
	};

	const handleSubmitVote = () => {
		console.log('Submitting vote for:', selectedOption);
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
											survey.isAnswered
												? 'cursor-default'
												: 'cursor-pointer'
										}`}
										onClick={() => handleVote(option.id)}
										disabled={survey.isAnswered}
									>
										<div className="flex-1">
											<span className="text-xs sm:text-sm">
												{option.option}
											</span>
										</div>
										<div className="flex items-center gap-2">
											{survey.isAnswered && (
												<>
													<Badge
														variant="secondary"
														className="text-xs"
													>
														{option.count}{' '}
														{option.count === 1
															? t('vote')
															: t('votes')}
													</Badge>
												</>
											)}
										</div>
									</Button>

									{survey.isAnswered && (
										<div className="w-full bg-gray-200 rounded-full h-1">
											<div
												className="bg-blue-600 h-1 rounded-full transition-all duration-300"
												style={{
													width: `${option.percentage}%`,
												}}
											/>
										</div>
									)}
								</div>
							);
						})}
					</div>

					{survey.isAnswered && totalVotes > 0 && (
						<div className="text-center">
							<p className="text-xs text-gray-500">
								{t('totalVotes', { count: totalVotes })}
							</p>
						</div>
					)}

					{!survey.isAnswered && selectedOption && (
						<Button
							className="w-full hover:bg-gray-300 hover:text-gray-800 hover:cursor-pointer"
							size="sm"
							variant="secondary"
							onClick={() => handleSubmitVote()}
						>
							{t('submitVote')}
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
