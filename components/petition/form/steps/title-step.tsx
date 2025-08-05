import { Input } from '@/components/ui/input';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTitleSuggestions } from '@/hooks/use-get-title-suggestions';
import { TitleSuggestionPayload } from '@/schemas/title-suggestion-payload';
import { useDebounce } from 'use-debounce';

type PetitionData = {
	category: string;
	title: string;
};

type TitleStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

export function TitleStep({ formData, updateFormData }: TitleStepProps) {
	const t = useTranslations('petition.form.titleStep');
	const locale = useLocale();

	// Debounce the title input for API calls
	const [debouncedTitle] = useDebounce(formData.title, 5 * 1000);

	const categories = [
		'culture',
		'religion',
		'womenRights',
		'menRights',
		'education',
		'environment',
		'racism',
		'politics',
		'handicap',
		'health',
		'transport',
		'immigration',
		'justice',
		'animals',
		'other',
	];

	// Map form categories to API categories
	const mapCategoryToAPI = (category: string) => {
		const categoryMap: Record<string, string> = {
			womenRights: 'WOMEN_RIGHTS',
			menRights: 'MEN_RIGHTS',
			culture: 'CULTURE',
			religion: 'RELIGION',
			education: 'EDUCATION',
			environment: 'ENVIRONMENT',
			racism: 'RACISM',
			politics: 'POLITICS',
			handicap: 'HANDICAP',
			health: 'HEALTH',
			transport: 'TRANSPORT',
			immigration: 'IMMIGRATION',
			justice: 'JUSTICE',
			animals: 'ANIMALS',
		};
		return categoryMap[category] || 'CULTURE';
	};

	// Create payload for API call using debounced title
	const suggestionPayload = {
		inputTitle: debouncedTitle,
		category: mapCategoryToAPI(formData.category),
		responseLanguage: locale.toUpperCase() as 'FR' | 'EN' | 'ES',
	} as TitleSuggestionPayload;

	// Use the API hook for getting suggestions with debounced title
	const {
		data: suggestionsData,
		isLoading: isLoadingSuggestions,
		error: suggestionsError,
	} = useGetTitleSuggestions(suggestionPayload, {
		enabled: Boolean(formData.category && debouncedTitle.length >= 2),
	});

	const suggestions = suggestionsData?.suggestions || [];

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-4">{t('selectTheme')}</h2>
				<div className="flex flex-wrap gap-2 sm:gap-3 justify-start mb-6">
					{categories.map((category) => (
						<button
							key={category}
							type="button"
							className={cn(
								'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium',
								'border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
								'min-w-0 whitespace-nowrap transition-colors cursor-pointer',
								formData.category === category
									? 'bg-primary text-primary-foreground border-primary shadow-sm'
									: 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent'
							)}
							onClick={() => updateFormData({ category })}
						>
							{t(`categories.${category}`)}
						</button>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-4">
					{t('titleLabel')}
				</h3>
				<Input
					placeholder={t('titlePlaceholder')}
					value={formData.title}
					onChange={(e) => updateFormData({ title: e.target.value })}
					className="mb-4"
				/>

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
										{suggestions.map(
											(suggestion, index) => (
												<button
													key={index}
													type="button"
													className="block w-full text-left p-3 rounded-md border border-orange-200 bg-white hover:bg-blue-100 transition-colors text-gray-700"
													onClick={() =>
														updateFormData({
															title: suggestion,
														})
													}
												>
													{suggestion}
												</button>
											)
										)}
									</div>
								) : formData.category &&
								  debouncedTitle.length >= 2 ? (
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
							{t('adviceText')}
						</AlertDescription>
					</Alert>
				</div>
			</div>
		</div>
	);
}

// Add validation function for title step
export function validateTitleStep(
	formData: Pick<PetitionData, 'category' | 'title'>
): boolean {
	const hasCategory = Boolean(formData.category !== '');
	const hasValidTitle = Boolean(
		formData.title?.trim() && formData.title.trim().length > 0
	);

	return hasCategory && hasValidTitle;
}
