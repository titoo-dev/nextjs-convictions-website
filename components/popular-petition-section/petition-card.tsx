import { slugify } from '@/lib/utils';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { PetitionMedia } from './petition-media';
import { PetitionStats } from './petition-stats';
import Link from 'next/link';
import { PublicPetition } from '@/schemas/petition';

type PetitionCardProps = {
	petition: PublicPetition;
};

export function PetitionCard({ petition }: PetitionCardProps) {
	return (
		<Link href={`/petition/${slugify(petition.title)}/${petition.id_seq}`}>
			<Card className="hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer">
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
					<PetitionStats petition={petition} />
				</CardContent>
			</Card>
		</Link>
	);
}
