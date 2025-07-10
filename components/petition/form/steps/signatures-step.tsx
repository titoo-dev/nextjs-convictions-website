import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

type PetitionData = {
    signatureGoal: number;
};

type SignaturesStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function SignaturesStep({ formData, updateFormData }: SignaturesStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Desired number of signatures</h2>
                <p className="text-gray-600 mb-6">
                    Set a realistic but mobilizing goal. Determine the number of signatures you want to reach to give weight to your message.
                </p>
            </div>

            <div>
                <Input
                    type="number"
                    min="1"
                    placeholder="1000"
                    value={formData.signatureGoal || ''}
                    onChange={(e) => updateFormData({ signatureGoal: Number(e.target.value) || 0 })}
                    className="text-lg py-3 px-4"
                />
            </div>

            <Alert className="bg-orange-50 border-orange-200">
                <AlertDescription className="text-orange-700">
                    <strong>💡 Advice</strong>
                    Start with an accessible goal (ex: 500, 1000), you can increase it if your petition gains popularity.
                </AlertDescription>
            </Alert>
        </div>
    );
}
