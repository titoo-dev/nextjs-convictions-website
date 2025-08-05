'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/petition';
import { useTranslations } from 'next-intl';

type PetitionDetailsProps = {
	petition: PublicPetition;
};

export function PetitionDetails({ petition }: PetitionDetailsProps) {
	const t = useTranslations('petition.details');

	return (
		<Card className="shadow-none gap-3">
			<CardHeader>
				<CardTitle className="text-lg sm:text-xl">
					{t('title')}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 py-0">
				<div className="min-w-0 flex-1 flex flex-col gap-1">
					<p className="font-medium text-xs sm:text-sm text-gray-500">
						{t('objective')}
					</p>
					<p className="text-sm break-words">{petition.objective}</p>
				</div>
			</CardContent>
		</Card>
	);
}
