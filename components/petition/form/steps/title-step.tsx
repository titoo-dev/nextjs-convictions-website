import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

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
				<h3 className="text-xl font-semibold mb-4">{t('titleLabel')}</h3>
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
								{t('suggestionsEmpty')}
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
export function validateTitleStep(formData: Pick<PetitionData, 'category' | 'title'>): boolean {
	const hasCategory = Boolean(formData.category !== '');
	const hasValidTitle = Boolean(formData.title?.trim() && formData.title.trim().length > 0);
	
	return hasCategory && hasValidTitle;
}
