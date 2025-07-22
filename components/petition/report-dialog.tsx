'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createLitigation } from '@/actions/create-litigation';
import { toast } from 'sonner';

type ReportReason =
	| 'privacy_violation_without_consent'
	| 'privacy_policy_violation'
	| 'lack_of_reliable_evidence'
	| 'illegal_use_of_personal_data'
	| 'other';

type ReportDialogProps = {
	children: React.ReactNode;
	petitionId: string;
};

const reportReasons: Array<{
	value: ReportReason;
	label: string;
	description: string;
}> = [
	{
		value: 'privacy_violation_without_consent',
		label: 'Privacy violation without consent',
		description:
			'Personal information was collected or used without proper authorization',
	},
	{
		value: 'privacy_policy_violation',
		label: 'Privacy policy violation',
		description:
			'The petition violates established privacy policies or terms of service',
	},
	{
		value: 'lack_of_reliable_evidence',
		label: 'Lack of reliable evidence',
		description:
			'The petition contains unsubstantiated claims or misleading information',
	},
	{
		value: 'illegal_use_of_personal_data',
		label: 'Illegal use of personal data',
		description:
			'Personal data is being used in violation of data protection laws',
	},
	{
		value: 'other',
		label: 'Other',
		description: 'Other concerns not covered by the above categories',
	},
];

export function ReportDialog({ children, petitionId }: ReportDialogProps) {
	const t = useTranslations('petition.report');
	const tReason = useTranslations('petition.report.other');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedReason, setSelectedReason] = useState<ReportReason | ''>('');
	const [customReason, setCustomReason] = useState('');
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!selectedReason ||
			(selectedReason === 'other' && !customReason.trim())
		) {
			return;
		}

		startTransition(async () => {
			try {
				const reason =
					selectedReason === 'other'
						? customReason.trim()
						: reportReasons.find((r) => r.value === selectedReason)
								?.label || '';

				await createLitigation({
					petitionId,
					reason,
				});

				toast.success(
					t('success', {
						defaultValue: 'Report submitted successfully',
					})
				);
				setIsOpen(false);
				setSelectedReason('');
				setCustomReason('');
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: 'Failed to submit report';
				toast.error(t('error', { defaultValue: errorMessage }));
			}
		});
	};

	const handleCancel = () => {
		setIsOpen(false);
		setSelectedReason('');
		setCustomReason('');
	};

	const isFormValid =
		selectedReason && (selectedReason !== 'other' || customReason.trim());

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-2">
						<Flag className="h-5 w-5 text-orange-500" />
						<DialogTitle className="text-lg font-semibold">
							{t('title', { defaultValue: 'Report policy' })}
						</DialogTitle>
					</div>
					<DialogDescription className="text-sm text-muted-foreground">
						{t('description', {
							defaultValue:
								'Help us maintain a safe and respectful community by reporting inappropriate content.',
						})}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-3">
						<Label className="text-sm font-medium">
							{t('reasonQuestion', {
								defaultValue:
									'What is the reason for your litigation ?',
							})}
						</Label>

						<RadioGroup
							value={selectedReason}
							onValueChange={(value) => {
								setSelectedReason(value as ReportReason);
								if (value !== 'other') {
									setCustomReason('');
								}
							}}
							className="space-y-3"
						>
							{reportReasons.map((reason) => {
								return (
									<div
										key={reason.value}
										className="flex items-start space-x-3"
									>
										<RadioGroupItem
											value={reason.value}
											id={reason.value}
											className="mt-1"
										/>
										<Label
											htmlFor={reason.value}
											className="flex-1 cursor-pointer"
										>
											<div className="flex items-start gap-2">
												<div className="space-y-1">
													<div className="font-medium text-sm">
														{reason.label}
													</div>
													<div className="text-xs text-muted-foreground leading-relaxed">
														{reason.description}
													</div>
												</div>
											</div>
										</Label>
									</div>
								);
							})}
						</RadioGroup>

						{selectedReason === 'other' && (
							<div className="space-y-2 pl-7">
								<Label
									htmlFor="custom-reason"
									className="text-sm font-medium"
								>
									{tReason('customReasonLabel', {
										defaultValue:
											'Please specify your reason',
									})}
								</Label>
								<Input
									id="custom-reason"
									placeholder={tReason(
										'customReasonPlaceholder',
										{
											defaultValue:
												'Describe the issue...',
										}
									)}
									value={customReason}
									onChange={(e) =>
										setCustomReason(e.target.value)
									}
									className="w-full"
									required
								/>
							</div>
						)}
					</div>

					<DialogFooter className="flex flex-col sm:flex-row gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={handleCancel}
							disabled={isPending}
							className="w-full sm:w-auto"
						>
							{t('cancel', { defaultValue: 'Cancel' })}
						</Button>
						<Button
							type="submit"
							disabled={!isFormValid || isPending}
							className={cn(
								'w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white',
								(!isFormValid || isPending) &&
									'opacity-50 cursor-not-allowed'
							)}
						>
							{isPending ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
									{t('submitting', {
										defaultValue: 'Submitting...',
									})}
								</>
							) : (
								t('send', { defaultValue: 'Send' })
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
