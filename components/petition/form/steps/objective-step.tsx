import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslations } from 'next-intl';

type PetitionData = {
    objective: string;
    destination: string;
};

type ObjectiveStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function ObjectiveStep({ formData, updateFormData }: ObjectiveStepProps) {
    const t = useTranslations('petition.form.objectiveStep');

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
							{t('suggestionsEmpty')}
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
export function validateObjectiveStep(formData: Pick<PetitionData, 'objective' | 'destination'>): boolean {
    return !!(
        formData.destination && 
        formData.destination.trim().length > 0 &&
        formData.objective && 
        formData.objective.trim().length > 0
    );
}
