'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicPetition } from '@/schemas/petition';
import { useTranslations } from 'next-intl';

type SignatureCounterProps = {
	petition: PublicPetition;
};

export function SignatureCounter({ petition }: SignatureCounterProps) {
	const t = useTranslations('petition.signatures');
	const progressPercentage = Math.min(
		(petition.usersSignedNumber / petition.signatureGoal) * 100,
		100
	);
	const signaturesNeeded =
		petition.signatureGoal - petition.usersSignedNumber;

	return (
		<Card className="shadow-none">
			<CardContent className="p-3 text-center">
				<div className="relative">
					<div className="text-xl sm:text-2xl font-bold mb-1">
						{petition.usersSignedNumber.toLocaleString()}
					</div>
					<Badge variant="secondary" className="mb-2 text-xs">
						{t('verified')}
					</Badge>
					<div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
						<div
							className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
							style={{
								width: `${progressPercentage}%`,
							}}
						/>
					</div>
					<p className="text-xs text-gray-500 leading-tight">
						{signaturesNeeded > 0
							? t('needed', {
									count: signaturesNeeded.toLocaleString(),
									goal: petition.signatureGoal.toLocaleString(),
							  })
							: t('goalReached', {
									goal: petition.signatureGoal.toLocaleString(),
							  })}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
