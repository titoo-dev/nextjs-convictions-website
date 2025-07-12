'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Flag, Calendar } from 'lucide-react';
import { PublicPetition } from '@/schemas/public-petition';
import { useTranslations } from 'next-intl';

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
						<AvatarImage src={petition.author.pictureUrl} />
						<AvatarFallback>
							{petition.author.name.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="font-semibold text-base sm:text-lg truncate">
							{petition.author.name}
						</p>
						<div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
							<Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
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
				<Button
					variant="outline"
					size="sm"
					className="w-full md:w-max md:ml-auto self-end sm:self-auto text-xs sm:text-sm whitespace-nowrap"
				>
					<Flag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
					{t('reportPolicy')}
				</Button>
			</CardContent>
		</Card>
	);
}
