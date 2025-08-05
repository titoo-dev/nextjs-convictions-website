'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/petition';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { User } from '@/schemas/user';

type MobileActionCardProps = {
	petition: PublicPetition;
	currentUser: User | null;
};

export function MobileActionCard({ petition }: MobileActionCardProps) {
	const t = useTranslations('petition.page');

	const scrollToSignForm = () => {
		const signForm = document.querySelector('[data-sign-form]');
		if (signForm) {
			signForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	const isAlreadySigned = petition.isISign;

	return (
		<Card className="shadow-none">
			<CardContent className="p-4">
				<div className="flex flex-col gap-3">
					<Button
						onClick={scrollToSignForm}
						disabled={isAlreadySigned}
						className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 text-sm disabled:opacity-50"
					>
						{isAlreadySigned
							? t('alreadySigned')
							: t('signPetition')}
					</Button>
					<Button
						asChild
						variant="outline"
						className="flex-1 bg-indigo-50 text-blue-800 hover:bg-indigo-100 font-semibold py-2 text-sm"
					>
						<Link href={`/boost-plan/${petition.id}`}>
							{t('boostPetition')}
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
