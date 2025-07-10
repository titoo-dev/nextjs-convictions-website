import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type PetitionData = {
    category: string;
    title: string;
};

type TitleStepProps = {
    formData: PetitionData;
    updateFormData: (updates: Partial<PetitionData>) => void;
};

const categories = [
    'Culture',
    'Religion',
    'Women rights',
    'Men rights',
    'Education',
    'Environment',
    'Racism',
    'Politics',
    'Handicap',
    'Health',
    'Transport',
    'Immigration',
    'Justice',
    'Animals',
    'Other',
];

export function TitleStep({ formData, updateFormData }: TitleStepProps) {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-4">Select theme</h2>
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
							{category}
						</button>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-4">Title</h3>
				<Input
					placeholder="What change do you want?"
					value={formData.title}
					onChange={(e) => updateFormData({ title: e.target.value })}
					className="mb-4"
				/>

				<div className="space-y-4">
					<Card className="bg-orange-50 border-orange-200 shadow-none">
						<CardHeader>
							<CardTitle className="text-orange-700 text-sm flex items-center gap-2">
								🔥 Suggestions
							</CardTitle>
							<CardDescription className="text-sm text-gray-600">
								Please write a title first
							</CardDescription>
						</CardHeader>
					</Card>

					<Alert className="bg-orange-50 border-orange-200">
						<AlertTitle className="text-orange-700">
							💡 Advice
						</AlertTitle>
						<AlertDescription className="text-gray-600">
							Use action verbs. For example: &quot;Ban plastic
							bags in our city&quot; or &quot;Protect the forest
							of X&quot;. Avoid vague formulations.
						</AlertDescription>
					</Alert>
				</div>
			</div>
		</div>
	);
}
