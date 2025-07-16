import { Input } from '@/components/ui/input';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebouncedCallback } from 'use-debounce';

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
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

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

	// Dummy AI suggestions based on category and title
	const generateSuggestions = (category: string, title: string): string[] => {
		const baseSuggestions = {
			environment: [
				'Protégeons nos forêts contre la déforestation massive',
				'Pour une transition énergétique équitable et durable',
				'Stop à la pollution plastique dans nos océans',
			],
			education: [
				'Pour un enseignement gratuit et accessible à tous',
				"Améliorons les conditions d'apprentissage dans nos écoles",
				"Non à la suppression des postes d'enseignants",
			],
			health: [
				'Pour un accès équitable aux soins de santé',
				'Sauvons notre système de santé publique',
				'Non à la fermeture des hôpitaux de proximité',
			],
			politics: [
				'Pour plus de transparence dans nos institutions',
				'Contre la corruption dans la vie politique',
				'Pour une démocratie plus participative',
			],
		};

		const categoryKey = category as keyof typeof baseSuggestions;
		const categorySuggestions = baseSuggestions[categoryKey] || [
			'Pour une société plus juste et équitable',
			'Défendons nos droits fondamentaux',
			'Ensemble pour un changement positif',
		];

		// Filter suggestions based on title similarity
		if (title.trim().length > 3) {
			return categorySuggestions
				.filter(
					(suggestion) =>
						!suggestion.toLowerCase().includes(title.toLowerCase())
				)
				.slice(0, 3);
		}

		return categorySuggestions.slice(0, 3);
	};

	// Debounced function for generating suggestions
	const debouncedGenerateSuggestions = useDebouncedCallback(
		(category: string, title: string) => {
			if (!category || title.length < 2) {
				setSuggestions([]);
				setIsLoadingSuggestions(false);
				return;
			}

			const newSuggestions = generateSuggestions(category, title);
			setSuggestions(newSuggestions);
			setIsLoadingSuggestions(false);
		},
		800
	);

	// Effect to trigger debounced suggestions
	useEffect(() => {
		if (!formData.category || formData.title.length < 2) {
			setSuggestions([]);
			return;
		}

		setIsLoadingSuggestions(true);
		debouncedGenerateSuggestions(formData.category, formData.title);
	}, [formData.category, formData.title, debouncedGenerateSuggestions]);

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
								) : suggestions.length > 0 ? (
									<div className="space-y-2 mt-4">
										{suggestions.map(
											(suggestion, index) => (
												<button
													key={index}
													type="button"
													className="block w-full text-left p-3 rounded-md border border-orange-200 bg-white hover:bg-orange-50 transition-colors text-gray-700"
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
								  formData.title.length >= 2 ? (
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
