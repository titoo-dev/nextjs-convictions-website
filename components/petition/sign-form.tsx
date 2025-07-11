'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PublicPetition } from '@/schemas/public-petition';
import { signPublicPetition } from '@/actions/sign-public-petition';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';

type SignFormProps = {
	petition: PublicPetition;
};

export function SignForm({ petition }: SignFormProps) {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [comment, setComment] = useState('');
	const [notifications, setNotifications] = useState('yes');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!petition || !email.trim()) return;

		startTransition(async () => {
			setIsLoading(true);
			setError(null);

			try {
				const result = await signPublicPetition({
					petitionId: petition.id,
					email: email.trim(),
					comment: comment.trim() || undefined,
					isOptin: true,
					lang: 'EN',
					name: 'Titosy',
				});

				if (result.success) {
					setSuccess(true);
					setShowSuccessDialog(true);
					// Reset form
					setEmail('');
					setName('');
					setComment('');
					setNotifications('yes');
				} else {
					setError(result.error || 'Failed to sign petition');
				}
			} catch (err) {
				setError('An unexpected error occurred');
			} finally {
				setIsLoading(false);
			}
		});
	};

	const isSubmitting = isLoading || isPending;

	return (
		<>
			<Card className="shadow-none">
				<CardHeader>
					<CardTitle className="text-xl">
						{petition.isISign || success
							? 'You already signed'
							: 'Sign this petition'}
					</CardTitle>
				</CardHeader>
				<CardContent>
					{petition.isISign || success ? (
						<div className="text-center py-4 transition-all duration-300 ease-in-out">
							<Badge
								variant="default"
								className="bg-green-600 animate-in fade-in-0 zoom-in-95 duration-200"
							>
								✓ Signed
							</Badge>
							<p className="text-sm text-gray-500 mt-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-100">
								Thank you for your support!
							</p>
						</div>
					) : (
						<div className="transition-all duration-300 ease-in-out">
							<form onSubmit={handleSubmit} className="space-y-4">
								{error && (
									<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md animate-in fade-in-0 slide-in-from-top-2 duration-200">
										{error}
									</div>
								)}

								<div className="transition-all duration-200 ease-in-out">
									<Input
										type="email"
										placeholder="Your email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
										disabled={isSubmitting}
										className="w-full transition-all duration-200 focus:scale-[1.02]"
									/>
								</div>

								<div className="transition-all duration-200 ease-in-out">
									<Input
										type="text"
										placeholder="Your name (optional)"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										disabled={isSubmitting}
										className="w-full transition-all duration-200 focus:scale-[1.02]"
									/>
								</div>

								<div className="transition-all duration-200 ease-in-out">
									<Textarea
										placeholder="Leave a comment (optional)"
										value={comment}
										onChange={(e) =>
											setComment(e.target.value)
										}
										disabled={isSubmitting}
										className="w-full min-h-[100px] resize-none transition-all duration-200 focus:scale-[1.02]"
									/>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting || !email.trim()}
									className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 disabled:opacity-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
								>
									<span
										className={`transition-all duration-200 ${
											isSubmitting
												? 'opacity-0'
												: 'opacity-100'
										}`}
									>
										I sign
									</span>
									{isSubmitting && (
										<span className="absolute inset-0 flex items-center justify-center">
											<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
											<span className="ml-2">
												Signing...
											</span>
										</span>
									)}
								</Button>

								<div className="transition-all duration-300 ease-in-out">
									<RadioGroup
										value={notifications}
										onValueChange={setNotifications}
										disabled={isSubmitting}
									>
										<div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
											<RadioGroupItem
												value="yes"
												id="yes"
												disabled={isSubmitting}
											/>
											<Label
												htmlFor="yes"
												className="text-sm cursor-pointer"
											>
												Yes, keep me informed if this
												petition succeeds, and tell me
												how I can contribute
											</Label>
										</div>
										<div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
											<RadioGroupItem
												value="no"
												id="no"
												disabled={isSubmitting}
											/>
											<Label
												htmlFor="no"
												className="text-sm cursor-pointer"
											>
												No, I do not want to be informed
												of this petition or future
												initiatives
											</Label>
										</div>
									</RadioGroup>
								</div>
							</form>
						</div>
					)}
				</CardContent>
			</Card>

			<Dialog
				open={showSuccessDialog}
				onOpenChange={setShowSuccessDialog}
			>
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
						<DialogTitle className="text-xl font-semibold">
							Your commitment doesn't stop here!
						</DialogTitle>
						<DialogDescription className="text-base text-muted-foreground">
							The true engine of change, it's our collective
							action. Help this petition reach more people
							committed to a better world.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<p className="text-sm font-medium">
							Do you want to contribute 7€ to strengthen its
							visibility in the media?
						</p>

						<div className="space-y-3">
							<Button
								className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3"
								onClick={() => setShowSuccessDialog(false)}
							>
								Yes, I want to donate 7€ to help the petition
								reach its goal
							</Button>

							<Button
								variant="ghost"
								className="w-full text-gray-600 hover:text-gray-800"
								onClick={() => setShowSuccessDialog(false)}
							>
								No, I prefer to share it
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
