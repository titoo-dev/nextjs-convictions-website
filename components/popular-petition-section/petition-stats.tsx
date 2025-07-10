import Link from "next/link";
import { Button } from "../ui/button";

type PetitionStatsProps = {
    signaturesCount: number;
    petitionId: string;
}

export function PetitionStats({ signaturesCount, petitionId }: PetitionStatsProps) {
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
				<Link href={`/petition/${petitionId}`}>I sign</Link>
			</Button>
		</div>
	);
}
