import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Facebook,
	Mail,
	MessageCircle,
	Share2,
	Twitter,
	TrendingUp,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

type OwnerEmptyDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	petitionId: string;
};

export function OwnerEmptyDialog({
	open,
	onOpenChange,
	petitionId,
}: OwnerEmptyDialogProps) {
	const t = useTranslations('petition.ownerEmpty');
	const [shareDialogOpen, setShareDialogOpen] = useState(false);

	const handleShareClick = () => {
		onOpenChange(false);
		setShareDialogOpen(true);
	};

	const handleShare = (platform: string) => {
		// Get current page URL for sharing
		const currentUrl = encodeURIComponent(window.location.href);
		const pageTitle = encodeURIComponent(document.title);

		let shareUrl = '';

		switch (platform) {
			case 'facebook':
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
				break;
			case 'twitter':
				shareUrl = `https://x.com/intent/tweet?text=${currentUrl}`;
				break;
			case 'whatsapp':
				shareUrl = `https://api.whatsapp.com/send?text=${currentUrl}`;
				break;
			case 'email':
				shareUrl = `mailto:?subject=${pageTitle}&body=${currentUrl}`;
				break;
		}

		if (shareUrl) {
			window.open(shareUrl, '_blank', 'noopener,noreferrer');
		}
	};

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange} modal={true}>
				<DialogContent
					className="max-w-md text-center"
					onInteractOutside={(e) => e.preventDefault()}
				>
					<DialogHeader className="space-y-4">
						<div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
							<div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
								<TrendingUp className="w-6 h-6 text-white" />
							</div>
						</div>
						<DialogTitle className="text-xl font-semibold text-center">
							{t('title')}
						</DialogTitle>
						<DialogDescription className="text-base text-muted-foreground text-center">
							{t('description')}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<p className="text-sm font-medium">
							{t('boostQuestion')}
						</p>

						<div className="space-y-3">
							<Button
								asChild
								className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3"
							>
								<Link href={`/boost-plan/${petitionId}`}>
									{t('boostButton')}
								</Link>
							</Button>

							<Button
								variant="ghost"
								className="w-full text-gray-600 hover:text-gray-800"
								onClick={handleShareClick}
							>
								{t('shareButton')}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog
				open={shareDialogOpen}
				onOpenChange={setShareDialogOpen}
				modal={true}
			>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle className="text-lg font-semibold flex items-center">
							<Share2 className="h-5 w-5 mr-2" />
							{t('share.title')}
						</DialogTitle>
						<DialogDescription>
							{t('share.description')}
						</DialogDescription>
					</DialogHeader>

					<div className="grid grid-cols-2 gap-3 mt-4">
						<Button
							variant="outline"
							size="sm"
							className="flex items-center justify-center gap-2"
							onClick={() => handleShare('facebook')}
						>
							<Facebook className="h-4 w-4" />
							Facebook
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center justify-center gap-2"
							onClick={() => handleShare('twitter')}
						>
							<Twitter className="h-4 w-4" />
							Twitter
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center justify-center gap-2"
							onClick={() => handleShare('whatsapp')}
						>
							<MessageCircle className="h-4 w-4" />
							WhatsApp
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="flex items-center justify-center gap-2"
							onClick={() => handleShare('email')}
						>
							<Mail className="h-4 w-4" />
							Email
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
