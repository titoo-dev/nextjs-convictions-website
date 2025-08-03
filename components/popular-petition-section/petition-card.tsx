import { slugify } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PetitionMedia } from './petition-media';
import { PetitionStats } from './petition-stats';
import Link from 'next/link';
import { PublicPetition } from '@/schemas/petition';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import RenderWhen from '../render-when';

type PetitionCardProps = {
	petition: PublicPetition;
};

export function PetitionCard({ petition }: PetitionCardProps) {
	const t = useTranslations('petitions.card');

	return (
		<Link href={`/petition/${slugify(petition.title)}/${petition.id_seq}`}>
			<Card className="hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer pt-0 overflow-hidden">
				<PetitionMedia
					mediaType={petition.mediaType}
					videoYoutubeUrl={petition.videoYoutubeUrl}
					pictureUrl={petition.pictureUrl}
					title={petition.title}
				/>
				<CardHeader className="flex-1">
					<CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">
						{petition.title}
					</CardTitle>
					<p className="text-muted-foreground line-clamp-3">
						{petition.objective}
					</p>
					<div className="flex items-center gap-2 mt-2">
						{petition.author.picture && (
							<Image
								src={petition.author.pictureUrl}
								alt={petition.author.name}
								width={24}
								height={24}
								className="w-6 h-6 rounded-full object-cover"
							/>
						)}
						<span className="text-sm text-muted-foreground">
							{petition.author.name}
						</span>
						<RenderWhen condition={petition.usersSignedNumber > 0}>
							<span className="text-sm text-gray-500 ml-auto">
								{petition.usersSignedNumber} {t('signatures')}
							</span>
						</RenderWhen>
					</div>
				</CardHeader>
				<CardContent className="pt-0">
					<PetitionStats petition={petition} />
				</CardContent>
			</Card>
		</Link>
	);
}
