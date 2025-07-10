import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PetitionMedia } from "./petition-media";
import { PetitionStats } from "./petition-stats";

type PetitionCardProps = {
    petition: {
        id: string;
        title: string;
        objective: string;
        mediaType: string;
        videoYoutubeUrl?: string | null;
        pictureUrl?: string | null;
        usersSignedNumber: number;
    };
};

export function PetitionCard({ petition }: PetitionCardProps) {
	return (
		<Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
			<CardHeader className="flex-1">
				<PetitionMedia
					mediaType={petition.mediaType}
					videoYoutubeUrl={petition.videoYoutubeUrl}
					pictureUrl={petition.pictureUrl}
					title={petition.title}
				/>
				<CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">
					{petition.title}
				</CardTitle>
				<CardDescription className="line-clamp-3">
					{petition.objective}
				</CardDescription>
			</CardHeader>
			<CardContent className="pt-0">
				<PetitionStats
					signaturesCount={petition.usersSignedNumber}
					petitionId={petition.id}
				/>
			</CardContent>
		</Card>
	);
}
