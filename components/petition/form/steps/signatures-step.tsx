import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslations } from 'next-intl';

type PetitionData = {
    signatureGoal: number;
};

type SignaturesStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function SignaturesStep({ formData, updateFormData }: SignaturesStepProps) {
    const t = useTranslations('petition.form.signaturesStep');

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
                <p className="text-gray-600 mb-6">{t('description')}</p>
            </div>

            <div>
                <Input
                    type="number"
                    min="1"
                    placeholder={t('placeholder')}
                    value={formData.signatureGoal || ''}
                    onChange={(e) => updateFormData({ signatureGoal: Number(e.target.value) || 0 })}
                    className="text-lg py-3 px-4"
                />
            </div>

            <Alert className="bg-orange-50 border-orange-200">
                <AlertDescription className="text-orange-700">
                    <strong>{t('advice')}</strong> {t('adviceText')}
                </AlertDescription>
            </Alert>
        </div>
    );
}

// Add validation function for signatures step
export function validateSignaturesStep(formData: Pick<PetitionData, 'signatureGoal'>): boolean {
    return !!(formData.signatureGoal && formData.signatureGoal >= 1);
}
