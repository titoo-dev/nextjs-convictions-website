import { Input } from '@/components/ui/input';

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
            <h2 className="text-2xl font-bold">Signature goal</h2>
            <div>
                <label className="block text-sm font-medium mb-2">
                    How many signatures do you want to collect?
                </label>
                <Input
                    type="number"
                    min="1"
                    value={formData.signatureGoal}
                    onChange={(e) => updateFormData({ signatureGoal: Number(e.target.value) })}
                />
                <p className="text-sm text-gray-600 mt-2">
                    Setting a realistic goal helps build momentum for your petition.
                </p>
            </div>
        </div>
    );
}
