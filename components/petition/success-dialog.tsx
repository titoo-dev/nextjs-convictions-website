import { createPublicDonation } from '@/actions/create-public-donation';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

type SuccessDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
	const t = useTranslations('petition.success');
	const [isLoading, setIsLoading] = useState(false);

	const handleDonateClick = async () => {
		setIsLoading(true);

		try {
			const formData = new FormData();
			formData.set('amount', '7');

			const result = await createPublicDonation(formData);

			if (result.success && result.data) {
				window.location.href = result.data.url;
			} else {
				toast.error('Erreur lors du traitement du don', {
					description: result.error || 'Veuillez réessayer',
					duration: 4000,
				});
			}
		} catch (error) {
			console.error('Unexpected error:', error);
			toast.error("Une erreur inattendue s'est produite", {
				description: 'Veuillez réessayer plus tard',
				duration: 4000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md text-center">
				<DialogHeader className="space-y-4">
					<div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
						<div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
							<svg
								className="w-6 h-6 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
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
					<p className="text-sm font-medium">{t('donateQuestion')}</p>

					<div className="space-y-3">
						<Button
							className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3"
							onClick={handleDonateClick}
							disabled={isLoading}
						>
							{isLoading ? 'Traitement...' : t('donateButton')}
						</Button>

						<Button
							variant="ghost"
							className="w-full text-gray-600 hover:text-gray-800"
							onClick={() => onOpenChange(false)}
						>
							{t('shareButton')}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
