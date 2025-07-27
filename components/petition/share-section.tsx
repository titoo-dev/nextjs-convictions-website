'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/petition';
import { Mail, Share2 } from 'lucide-react';
import { Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import RenderWhen from '../render-when';

type ShareSectionProps = {
	petition: PublicPetition;
};

export function ShareSection({ petition }: ShareSectionProps) {
	const t = useTranslations('petition.share');
	const tBoost = useTranslations('petition.signForm');

	const handleShare = (platform: string) => {
		const petitionUrl = encodeURIComponent(petition.urlPetition);
		const petitionTitle = encodeURIComponent(petition.title);

		let shareUrl = '';

		switch (platform) {
			case 'facebook':
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${petitionUrl}`;
				break;
			case 'twitter':
				shareUrl = `https://x.com/intent/tweet?text=${petitionUrl}`;
				break;
			case 'whatsapp':
				shareUrl = `https://api.whatsapp.com/send?text=${petitionUrl}`;
				break;
			case 'email':
				shareUrl = `mailto:?subject=${petitionTitle}&body=${petitionUrl}`;
				break;
		}

		if (shareUrl) {
			window.open(shareUrl, '_blank', 'noopener,noreferrer');
		}
	};

	return (
		<Card className="shadow-none">
			<CardHeader>
				<CardTitle className="text-base sm:text-lg flex items-center">
					<Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
					{t('title')}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
					<Button
						variant="outline"
						size="sm"
						className="flex items-center justify-center gap-2 text-xs sm:text-sm"
						onClick={() => handleShare('facebook')}
					>
						<Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
						{t('facebook')}
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="flex items-center justify-center gap-2 text-xs sm:text-sm"
						onClick={() => handleShare('twitter')}
					>
						<Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
						{t('twitter')}
					</Button>
					<Button
						variant="outline"
						size="sm"
						className={
							'flex items-center justify-center gap-2 text-xs sm:text-sm'
						}
						onClick={() => handleShare('whatsapp')}
					>
						<MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
						{t('whatsapp')}
					</Button>
					<Button
						variant="outline"
						size="sm"
						className={
							'flex items-center justify-center gap-2 text-xs sm:text-sm'
						}
						onClick={() => handleShare('email')}
					>
						<Mail className="h-3 w-3 sm:h-4 sm:w-4" />
						{t('email')}
					</Button>
				</div>

				<RenderWhen condition={petition.isMine === true}>
					<div className="flex gap-2 mt-6">
						<Button
							asChild
							type="button"
							variant="outline"
							className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 sm:py-3 text-sm sm:text-base"
						>
							<Link href={`/boost-plan/${petition.id}`}>
								{tBoost('boostButton')}
							</Link>
						</Button>
					</div>
				</RenderWhen>
			</CardContent>
		</Card>
	);
}
