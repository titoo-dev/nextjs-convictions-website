import { Textarea } from '@/components/ui/textarea';

type PetitionData = {
    content: string;
};

type WritingStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function WritingStep({ formData, updateFormData }: WritingStepProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Tell your story</h2>
            <Textarea
                placeholder="Write the full content of your petition. Explain why this change is important, provide context and evidence..."
                value={formData.content}
                onChange={(e) => updateFormData({ content: e.target.value })}
                className="min-h-48"
            />
        </div>
    );
}
