'use client';

import { UserSignedPetition } from '@/schemas/user-signed-petition';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { PetitionMedia } from '../popular-petition-section/petition-media';

export function UserSignedPetitionCard({
	petition,
}: {
	petition: UserSignedPetition;
}) {
	const t = useTranslations('profile.petitions');

	return (
		<Card className="flex flex-col h-full">
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
				<p className="text-muted-foreground line-clamp-3">
					{petition.objective}
				</p>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-3">
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<span>
							{t('signatures-count', {
								count: petition.usersSignedNumber,
							})}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<div className="text-sm text-muted-foreground">
							{t('created-by')} {petition.author.name}
						</div>
						<Link
							href={`/petition/${slugify(petition.title)}/${
								petition.id_seq
							}`}
						>
							<Button
								variant="outline"
								size="sm"
								className="h-8 gap-1"
							>
								<ExternalLink className="h-3 w-3" />
								{t('view')}
							</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
