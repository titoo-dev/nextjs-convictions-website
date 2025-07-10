import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type PetitionData = {
    title: string;
    category: string;
    objective: string;
    destination: string;
    signatureGoal: number;
};

type PublishStepProps = {
    formData: PetitionData;
};

export function PublishStep({ formData }: PublishStepProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review and publish</h2>
            <Card>
                <CardHeader>
                    <CardTitle>{formData.title}</CardTitle>
                    <CardDescription>Category: {formData.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <strong>Objective:</strong>
                        <p className="text-sm text-gray-600">{formData.objective}</p>
                    </div>
                    <div>
                        <strong>Destination:</strong>
                        <p className="text-sm text-gray-600">{formData.destination}</p>
                    </div>
                    <div>
                        <strong>Signature Goal:</strong>
                        <p className="text-sm text-gray-600">
                            {formData.signatureGoal.toLocaleString()}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
