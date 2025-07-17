'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { PublicPetition } from '@/schemas/public-petition';
import { signPublicPetition } from '@/actions/sign-public-petition';
import { SuccessDialog } from './success-dialog';
import { PetitionFormInputs } from './petition-form-inputs';
import { NotificationOptions } from './notification-options';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type SignFormProps = {
	petition: PublicPetition;
};

export function SignForm({ petition }: SignFormProps) {
	const t = useTranslations('petition.signForm');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);
	const locale = useLocale();

	// Show toast if already signed on component mount
	useEffect(() => {
		if (petition.isISign) {
			toast.success(t('successMessages.alreadySigned'), {
				description: t('successMessages.alreadySignedDescription'),
				duration: 4000,
			});
		}
	}, [petition.isISign, t]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!petition) return;

		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const comment = formData.get('comment') as string;
		const notifications = formData.get('notifications') as string;

		if (!email?.trim()) return;

		startTransition(async () => {
			setIsLoading(true);
			setError(null);

			try {
				const result = await signPublicPetition({
					petitionId: petition.id,
					email: email.trim(),
					comment: comment.trim() || undefined,
					isOptin: notifications === 'yes',
					lang: locale.toUpperCase() as 'EN' | 'FR' | 'ES',
					name: name,
				});

				if (result.success) {
					setSuccess(true);
					setShowSuccessDialog(true);
					// Show success toast
					toast.success(t('successMessages.signedSuccessfully'), {
						description: t('successMessages.signedDescription'),
						duration: 5000,
					});
					// Reset form
					formRef.current?.reset();
				} else {
					setError(result.error || t('errors.failedToSign'));
					toast.error(t('errors.failedToSign'), {
						description: result.error || t('errors.tryAgain'),
						duration: 4000,
					});
				}
			} catch (err) {
				console.error('Error signing petition:', err);
				setError(t('errors.unexpectedError'));
				toast.error(t('errors.unexpectedError'), {
					description: t('errors.tryAgainLater'),
					duration: 4000,
				});
			} finally {
				setIsLoading(false);
			}
		});
	};

	const isSubmitting = isLoading || isPending;
	const isAlreadySigned = petition.isISign || success;

	return (
		<>
			<Card className="shadow-none">
				<CardHeader>
					<CardTitle className="text-lg sm:text-xl">
						{isAlreadySigned ? t('alreadySigned') : t('title')}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="transition-all duration-300 ease-in-out">
						<form
							ref={formRef}
							onSubmit={handleSubmit}
							className="space-y-4"
						>
							{error && (
								<div className="p-3 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-md animate-in fade-in-0 slide-in-from-top-2 duration-200">
									{error}
								</div>
							)}

							<PetitionFormInputs
								disabled={isSubmitting || isAlreadySigned}
							/>

							<Button
								type="submit"
								disabled={isSubmitting || isAlreadySigned}
								className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 sm:py-3 text-sm sm:text-base disabled:opacity-50"
							>
								{isSubmitting ? (
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent mr-2"></div>
										<span className="text-sm sm:text-base">
											{t('signing')}
										</span>
									</div>
								) : isAlreadySigned ? (
									t('alreadySignedButton')
								) : (
									t('signButton')
								)}
							</Button>

							<div className="flex gap-2">
								<Button
									asChild
									type="button"
									variant="outline"
									disabled={isSubmitting}
									className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 sm:py-3 text-sm sm:text-base"
								>
									<Link href={`/boost-plan/${petition.id}`}>
										{t('boostButton')}
									</Link>
								</Button>
							</div>

							<NotificationOptions
								disabled={isSubmitting || isAlreadySigned}
							/>
						</form>
					</div>
				</CardContent>
			</Card>

			<SuccessDialog
				open={showSuccessDialog}
				onOpenChange={setShowSuccessDialog}
			/>
		</>
	);
}
