import { PetitionCard } from "./petition-card";

type PetitionsGridProps = {
    petitions: Array<{
        id: string;
        title: string;
        objective: string;
        mediaType: string;
        videoYoutubeUrl?: string | null;
        pictureUrl?: string | null;
        usersSignedNumber: number;
    }>;
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
