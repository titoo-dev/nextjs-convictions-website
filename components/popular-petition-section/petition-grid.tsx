import { PublicPetition } from '@/schemas/petition';
import { PetitionCard } from './petition-card';

type PetitionsGridProps = {
	petitions: Array<PublicPetition>;
};

export function PetitionsGrid({ petitions }: PetitionsGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{petitions.map((petition) => (
				<PetitionCard key={petition.id} petition={petition} />
			))}
		</div>
	);
}
