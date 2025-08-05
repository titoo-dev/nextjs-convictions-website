'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Survey } from '@/schemas/survey';
import { Mail, Share2 } from 'lucide-react';
import { Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ShareSectionProps = {
	survey: Survey;
};

export function ShareSection({ survey }: ShareSectionProps) {
	const t = useTranslations('surveys.share');

	const handleShare = (platform: string) => {
		const surveyUrl = encodeURIComponent(survey.urlSurvey);
		const surveyQuestion = encodeURIComponent(survey.question);

		let shareUrl = '';

		switch (platform) {
			case 'facebook':
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${surveyUrl}`;
				break;
			case 'twitter':
				shareUrl = `https://x.com/intent/tweet?text=${surveyQuestion}%20${surveyUrl}`;
				break;
			case 'whatsapp':
				shareUrl = `https://api.whatsapp.com/send?text=${surveyQuestion}%20${surveyUrl}`;
				break;
			case 'email':
				shareUrl = `mailto:?subject=${surveyQuestion}&body=${surveyUrl}`;
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
			</CardContent>
		</Card>
	);
}
