import { Button } from '../ui/button';

type PetitionStatsProps = {
	signaturesCount: number;
};

export function PetitionStats({
	signaturesCount,
}: PetitionStatsProps) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-gray-500">
				{signaturesCount} Signatures
			</span>
			<Button
				size="sm"
				className="bg-orange-500 hover:bg-orange-600"
				asChild
			>
				I sign
			</Button>
		</div>
	);
}
