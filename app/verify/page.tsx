'use client';

import { useState, useRef, useEffect, useTransition, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { verifyEmail } from '@/actions/verify-email';
import { toast } from 'sonner';

export default function VerifyPage({
	searchParams,
}: {
	searchParams: Promise<{ email: string }>;
}) {
	const params = use(searchParams);
	const t = useTranslations('auth');
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const [email] = useState(params.email || '');

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	useEffect(() => {
		// Focus on first input when component mounts
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleInputChange = (index: number, value: string) => {
		if (value.length > 1) return; // Prevent multiple characters

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Auto-focus next input
		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			// Focus previous input on backspace if current is empty
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').slice(0, 6);
		const newOtp = [...otp];

		for (let i = 0; i < pastedData.length && i < 6; i++) {
			if (/^\d$/.test(pastedData[i])) {
				newOtp[i] = pastedData[i];
			}
		}

		setOtp(newOtp);

		// Focus the next empty input or the last one
		const nextEmptyIndex = newOtp.findIndex(
			(digit, idx) => !digit && idx < 6
		);
		const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
		inputRefs.current[focusIndex]?.focus();
	};

	const handleVerify = async (e: React.FormEvent) => {
		e.preventDefault();
		const otpCode = otp.join('');

		if (otpCode.length !== 6) return;

		startTransition(async () => {
			try {
				const result = await verifyEmail({
					email,
					code: parseInt(otpCode),
				});

				if (result.success) {
					toast.success(t('verify.success'));
					router.replace('/');
				} else {
					toast.error(result.error || t('verify.error'));
				}
			} catch (error) {
				toast.error(t('verify.error'));
			}
		});
	};

	const isFormValid = otp.every((digit) => digit !== '');

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-lg shadow-lg p-8">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							{t('verify.title')}
						</h1>
						<div className="w-16 h-1 bg-orange-500 rounded-full"></div>
					</div>

					{/* Verification Info */}
					<div className="mb-8">
						<h2 className="text-lg font-semibold text-gray-900 mb-2">
							{t('verify.emailVerification')}
						</h2>
						<p className="text-sm text-gray-600">
							{t('verify.description', {
								email: email,
							})}
						</p>
					</div>

					{/* OTP Form */}
					<form onSubmit={handleVerify} className="space-y-6">
						{/* OTP Input Grid */}
						<div className="flex justify-center gap-3">
							{otp.map((digit, index) => (
								<Input
									key={index}
									ref={(el) => {
										inputRefs.current[index] = el;
									}}
									type="text"
									inputMode="numeric"
									pattern="[0-9]"
									maxLength={1}
									value={digit}
									onChange={(e) =>
										handleInputChange(
											index,
											e.target.value.replace(/\D/g, '')
										)
									}
									onKeyDown={(e) => handleKeyDown(index, e)}
									onPaste={handlePaste}
									className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-md focus:border-orange-500 focus:ring-orange-500/20"
									aria-label={`Digit ${index + 1}`}
								/>
							))}
						</div>

						{/* Verify Button */}
						<Button
							type="submit"
							className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
							disabled={!isFormValid || isPending}
						>
							{isPending
								? t('verify.verifying')
								: t('verify.verify')}
						</Button>
					</form>

					{/* Back to Register */}
					<div className="mt-4 text-center">
						<button
							type="button"
							onClick={() => router.back()}
							className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
						>
							{t('verify.backToRegister')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
