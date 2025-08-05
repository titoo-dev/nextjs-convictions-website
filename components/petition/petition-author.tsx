'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { PublicPetition } from '@/schemas/petition';
import { useTranslations } from 'next-intl';
import { User } from '@/schemas/user';

type PetitionAuthorProps = {
	petition: PublicPetition;
};

export function PetitionAuthor({ petition }: PetitionAuthorProps) {
	const t = useTranslations('petition.author');

	return (
		<Card className="shadow-none">
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-row items-start sm:items-center sm:space-y-0 space-x-4">
					<Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
						<AvatarImage
							src={petition.author.pictureUrl}
							alt={petition.author.name}
						/>
						<AvatarFallback>
							{petition.author.name.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="font-semibold text-base sm:text-lg truncate">
							{petition.author.name}
						</p>
						<div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
							<span className="truncate">
								{new Date(
									petition.publishedAt
								).toLocaleDateString('fr-FR', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
								})}
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
