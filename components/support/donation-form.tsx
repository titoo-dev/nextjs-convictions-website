'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DonationAmountSelector } from './donation-amount-selector';
import { CustomAmountInput } from './custom-amount-input';
import { createPublicDonation } from '@/actions/create-public-donation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type DonationAmount = 5 | 10 | 20 | 50;

export function DonationForm() {
	const t = useTranslations("support.form");
	const [selectedAmount, setSelectedAmount] = useState<DonationAmount | null>(
		null
	);
	const [customAmount, setCustomAmount] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const donationAmounts: DonationAmount[] = [5, 10, 20, 50];

	const handleAmountSelect = (amount: DonationAmount) => {
		setSelectedAmount(amount);
		setCustomAmount('');
	};

	const handleCustomAmountChange = (value: string) => {
		setCustomAmount(value);
		setSelectedAmount(null);
	};

	const getFinalAmount = () => {
		if (customAmount) {
			const amount = parseFloat(customAmount);
			return amount > 0 ? amount : null;
		}
		return selectedAmount;
	};

	const handleSubmit = async () => {
		const amount = getFinalAmount();
		if (!amount || amount <= 0) {
			toast.error(t('errors.validAmount'), {
				description: t('errors.amountGreaterThanZero'),
				duration: 3000,
			});
			return;
		}

		setIsLoading(true);

		try {
			const formData = new FormData();
			formData.set('amount', amount.toString());

			const result = await createPublicDonation(formData);

			if (result.success && result.data) {
				toast.success(t('success.initiated'), {
					description: t('success.redirecting'),
					duration: 3000,
				});
				window.location.href = result.data.url;
			} else {
				toast.error(t('errors.processingFailed'), {
					description: result.error || t('errors.tryAgain'),
					duration: 4000,
				});
			}
		} catch (error) {
			console.error('Unexpected error:', error);
			toast.error(t('errors.unexpectedError'), {
				description: t('errors.tryAgainLater'),
				duration: 4000,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="shadow-none">
			<CardHeader>
				<CardTitle>{t('title')}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<DonationAmountSelector
					amounts={donationAmounts}
					selectedAmount={selectedAmount}
					onAmountSelect={handleAmountSelect}
				/>

				<CustomAmountInput
					value={customAmount}
					onChange={handleCustomAmountChange}
				/>

				<Button
					size="lg"
					className="w-full h-12 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white"
					disabled={
						!getFinalAmount() || getFinalAmount()! <= 0 || isLoading
					}
					onClick={handleSubmit}
				>
					<Heart className="w-5 h-5 mr-2" />
					{isLoading
						? t('processing')
						: t('payButton', { amount: getFinalAmount() || '' })
					}
				</Button>
			</CardContent>
		</Card>
	);
}
