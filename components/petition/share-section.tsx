'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicPetition } from '@/schemas/petition';
import { Mail } from 'lucide-react';
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
		<Card className="shadow-none gap-2">
			<CardHeader className="pb-3">
				<CardTitle className="text-sm sm:text-base flex items-center">
					{t('title')}
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="grid grid-cols-4 sm:grid-cols-3 gap-1.5 sm:gap-2">
					<Button
						variant="outline"
						size="sm"
						className="flex items-center justify-center gap-1 text-xs h-8"
						onClick={() => handleShare('facebook')}
					>
						<Facebook className="h-3 w-3" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="flex items-center justify-center gap-1 text-xs h-8"
						onClick={() => handleShare('twitter')}
					>
						<Twitter className="h-3 w-3" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="flex items-center justify-center gap-1 text-xs h-8"
						onClick={() => handleShare('whatsapp')}
					>
						<MessageCircle className="h-3 w-3" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="flex items-center justify-center gap-1 text-xs h-8"
						onClick={() => handleShare('email')}
					>
						<Mail className="h-3 w-3" />
					</Button>
				</div>

				<RenderWhen condition={petition.isMine === true}>
					<div className="flex flex-col gap-2 mt-4">
						<Button
							asChild
							type="button"
							variant="outline"
							className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-2.5 text-sm"
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
