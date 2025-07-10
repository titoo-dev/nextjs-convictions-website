import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type PetitionData = {
    objective: string;
    destination: string;
};

type ObjectiveStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

export function ObjectiveStep({ formData, updateFormData }: ObjectiveStepProps) {
    return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Objective</h2>

			<div>
				<h3 className="text-lg text-gray-600  font-semibold mb-2">
					Destination
				</h3>
				<Input
					placeholder="To whom do you want to address your petition ?"
					value={formData.destination}
					onChange={(e) =>
						updateFormData({ destination: e.target.value })
					}
					className="mb-4"
				/>
			</div>

			<div>
				<h3 className="text-md text-gray-600 font-semibold mb-4">
					Describe the goal you want to achieve: a law change, a
					concrete action, a position, etc. Be concise, convincing,
					and inspire others to join your cause.
				</h3>
				<Textarea
					placeholder="Why are you launching this petition ?"
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
							🔥 Suggestions
						</CardTitle>
						<CardDescription className="text-sm text-gray-600">
							Please write a objective first
						</CardDescription>
					</CardHeader>
				</Card>

				<Alert className="bg-orange-50 border-orange-200">
					<AlertTitle className="text-orange-700">
						⚠️ Advise
					</AlertTitle>
					<AlertDescription className="text-gray-600">
						A clear and motivating objective gives meaning to your
						petition and increases your chances of mobilization.{' '}
						<span className="text-red-500 font-medium">
							You have reached 7 % of your planned AI assistance
							usage
						</span>
					</AlertDescription>
				</Alert>
			</div>
		</div>
	);
}
