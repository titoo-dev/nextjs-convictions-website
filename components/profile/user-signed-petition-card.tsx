'use client';

import { UserSignedPetition } from '@/schemas/user-signed-petition';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ExternalLink, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';

export function UserSignedPetitionCard({
	petition,
}: {
	petition: UserSignedPetition;
}) {
	const t = useTranslations('profile.petitions');

	const formatDate = (dateString: string) => {
		return new Intl.DateTimeFormat('fr-FR', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		}).format(new Date(dateString));
	};

	return (
		<Card className="flex flex-col h-full">
			<CardHeader className="flex-1">
				<div className="relative">
					{petition.mediaType === 'PICTURE' && petition.pictureUrl ? (
						<Image
							src={petition.pictureUrl}
							alt={petition.title}
							width={400}
							height={192}
							className="w-full h-48 object-cover rounded-md"
						/>
					) : petition.mediaType === 'VIDEO_YOUTUBE' &&
					  petition.videoYoutubeUrl ? (
						<div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
							<span className="text-muted-foreground">
								YouTube Video
							</span>
						</div>
					) : (
						<div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
							<span className="text-muted-foreground">
								{t('no-media')}
							</span>
						</div>
					)}
					<Badge
						variant="secondary"
						className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
					>
						{t('signed')}
					</Badge>
				</div>
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
						<div className="flex items-center gap-1">
							<Calendar className="h-3 w-3" />
							<span>
								{t('published-on')}{' '}
								{formatDate(petition.publishedAt)}
							</span>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<div className="text-sm text-muted-foreground">
							{t('created-by')} {petition.author.name}
						</div>
						<Link href={`/petition/${petition.id_seq}`}>
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
