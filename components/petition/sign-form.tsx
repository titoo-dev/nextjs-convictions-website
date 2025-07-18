'use client';

import { useState, useTransition, useRef } from 'react';
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
import { User } from '@/schemas/user';
import { SignPetitionResponse } from '@/schemas/sign-petition-response';
import { SignPublicPetitionResponse } from '@/schemas/sign-public-petition-response';
import { signPetition } from '@/actions/sign-petition';
import RenderWhen from '../render-when';

type SignFormProps = {
	currentUser: User | null;
	petition: PublicPetition;
};

type ActionResult = {
	success: boolean;
	data?: SignPetitionResponse | SignPublicPetitionResponse;
	error?: string;
};

export function SignForm({ petition, currentUser }: SignFormProps) {
	const t = useTranslations('petition.signForm');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);
	const locale = useLocale();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log('Submitting petition sign form', petition);
		e.preventDefault();
		if (!petition) return;

		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const comment = formData.get('comment') as string;
		const notifications = formData.get('notifications') as string;

		startTransition(async () => {
			setIsLoading(true);
			setError(null);

			try {
				let result: ActionResult | null = null;

				if (!currentUser) {
					result = await signPublicPetition({
						petitionId: petition.id,
						email: email.trim(),
						comment: comment.trim() || undefined,
						isOptin: notifications === 'yes',
						lang: locale.toUpperCase() as 'EN' | 'FR' | 'ES',
						name: name,
					});
				} else {
					result = await signPetition({
						petitionId: petition.id,
						comment: comment.trim() || undefined,
						isOptin: notifications === 'yes',
					});
				}

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

	const signaturesLeft = Math.abs(
		petition.signatureGoal - petition.usersSignedNumber
	);

	return (
		<>
			<Card className="shadow-none gap-0">
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

							<RenderWhen condition={petition.isISign === true}>
								<div className="p-4 text-sm  bg-green-50 border border-green-200 rounded-md">
									{t('thankYouMessage', { signaturesLeft })}
								</div>
							</RenderWhen>

							<RenderWhen condition={petition.isISign === false}>
								<PetitionFormInputs
									currentUser={currentUser}
									disabled={isSubmitting || isAlreadySigned}
								/>
							</RenderWhen>

							<RenderWhen condition={petition.isISign === false}>
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
							</RenderWhen>

							<RenderWhen condition={petition.isISign}>
								<Button
									type="button"
									className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 sm:py-3 text-sm sm:text-base disabled:opacity-50"
									onClick={() => setShowSuccessDialog(true)}
								>
									{t('nextStepButton')}
								</Button>
							</RenderWhen>

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

							<RenderWhen condition={petition.isISign === false}>
								<NotificationOptions
									disabled={isSubmitting || isAlreadySigned}
								/>
							</RenderWhen>
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
