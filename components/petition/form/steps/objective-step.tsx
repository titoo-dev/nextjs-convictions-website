import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLocale, useTranslations } from 'next-intl';
import { useDebounce } from 'use-debounce';
import { ObjectiveSuggestionPayload } from '@/schemas/objective-suggestion-payload';
import { useGetObjectiveSuggestions } from '@/hooks/use-get-objective-suggestions';
import { Skeleton } from '@/components/ui/skeleton';

type PetitionData = {
	objective: string;
	destination: string;
	title: string;
	category: string;
};

type ObjectiveStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

export function ObjectiveStep({
	formData,
	updateFormData,
}: ObjectiveStepProps) {
	const t = useTranslations('petition.form.objectiveStep');
	const locale = useLocale();

	const [debouncedObjective] = useDebounce(formData.objective, 5 * 1000);

	const suggestionPayload = {
		inputGoal: debouncedObjective,
		category: formData.category ?? '',
		responseLanguage: locale.toUpperCase() as 'FR' | 'EN' | 'ES',
		title: formData.title || '', // Assuming title is part of formData
	} as ObjectiveSuggestionPayload;

	const {
		data: suggestionsData,
		isLoading: isLoadingSuggestions,
		error: suggestionsError,
	} = useGetObjectiveSuggestions(suggestionPayload, {
		enabled: Boolean(debouncedObjective.length >= 10),
	});

	const suggestions = suggestionsData?.suggestions || [];

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">{t('title')}</h2>

			<div>
				<h3 className="text-lg text-gray-600 font-semibold mb-2">
					{t('destination')}
				</h3>
				<Input
					placeholder={t('destinationPlaceholder')}
					value={formData.destination}
					onChange={(e) =>
						updateFormData({ destination: e.target.value })
					}
					className="mb-4"
				/>
			</div>

			<div>
				<h3 className="text-md text-gray-600 font-semibold mb-4">
					{t('description')}
				</h3>
				<Textarea
					placeholder={t('objectivePlaceholder')}
					value={formData.objective}
					onChange={(e) =>
						updateFormData({ objective: e.target.value })
					}
					className="min-h-32"
				/>
			</div>

			<div className="space-y-4">
				<Card className="bg-orange-50 border-orange-200 shadow-none">
					<CardHeader>
						<CardTitle className="text-orange-700 text-sm flex items-center gap-2">
							{t('suggestions')}
						</CardTitle>
						<CardDescription className="text-sm text-gray-600">
							{isLoadingSuggestions ? (
								<div className="space-y-3 mt-4">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-4/5" />
									<Skeleton className="h-4 w-3/4" />
								</div>
							) : suggestionsError ? (
								<div className="mt-4 text-red-600">
									{t('suggestionsError')}
								</div>
							) : suggestions.length > 0 ? (
								<div className="space-y-2 mt-4">
									{suggestions.map((suggestion, index) => (
										<button
											key={index}
											type="button"
											className="block w-full text-left p-3 rounded-md border border-orange-200 bg-white hover:bg-blue-100 transition-colors text-gray-700"
											onClick={() =>
												updateFormData({
													objective: suggestion,
												})
											}
										>
											{suggestion}
										</button>
									))}
								</div>
							) : debouncedObjective.length >= 10 ? (
								t('suggestionsEmpty')
							) : (
								t('suggestionsPrompt')
							)}
						</CardDescription>
					</CardHeader>
				</Card>

				<Alert className="bg-orange-50 border-orange-200">
					<AlertTitle className="text-orange-700">
						{t('advice')}
					</AlertTitle>
					<AlertDescription className="text-gray-600">
						{t('adviceText')}{' '}
						<span className="text-red-500 font-medium">
							{t('aiUsage', { percentage: 7 })}
						</span>
					</AlertDescription>
				</Alert>
			</div>
		</div>
	);
}

// Add validation function for objective step
export function validateObjectiveStep(
	formData: Pick<PetitionData, 'objective' | 'destination'>
): boolean {
	return !!(
		formData.destination &&
		formData.destination.trim().length > 0 &&
		formData.objective &&
		formData.objective.trim().length > 0
	);
}
