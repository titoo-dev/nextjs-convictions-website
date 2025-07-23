'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocale, useTranslations } from 'next-intl';
import { registerUser } from '@/actions/register';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
	const t = useTranslations('auth');
	const [isPending, startTransition] = useTransition();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const locale = useLocale();
	const router = useRouter();

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		// Clear password error when user types
		if (field === 'password' || field === 'confirmPassword') {
			setPasswordError('');
		}
	};

	const validatePasswords = () => {
		if (formData.password !== formData.confirmPassword) {
			setPasswordError(t('register.passwordMismatch'));
			return false;
		}
		return true;
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate passwords match
		if (!validatePasswords()) {
			return;
		}

		startTransition(async () => {
			try {
				const result = await registerUser({
					name: formData.name,
					email: formData.email,
					password: formData.password,
					lang: locale.toUpperCase() as 'EN' | 'FR' | 'ES',
				});

				if (result.success) {
					toast.success(t('register.success'));
					router.push(`/verify?email=${formData.email}`);
				} else {
					toast.error(result.error || t('register.error'));
				}
			} catch (error) {
				console.error(error);
				toast.error(t('register.error'));
			}
		});
	};

	const handleGoogleAuth = async () => {
		try {
			// TODO: Implement Google authentication
			console.log('Google auth');
		} catch (error) {
			console.error('Google auth error:', error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-lg shadow-lg p-8">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							{t('register.title')}
						</h1>
						<div className="w-16 h-1 bg-orange-500 rounded-full"></div>
					</div>

					{/* Registration Form */}
					<form onSubmit={handleRegister} className="space-y-6">
						{/* Name and Email Row */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									{t('register.name')}{' '}
									<span className="text-red-500">*</span>
								</label>
								<Input
									id="name"
									type="text"
									value={formData.name}
									onChange={(e) =>
										handleInputChange(
											'name',
											e.target.value
										)
									}
									className="w-full"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									{t('register.email')}{' '}
									<span className="text-red-500">*</span>
								</label>
								<Input
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) =>
										handleInputChange(
											'email',
											e.target.value
										)
									}
									className="w-full"
									required
								/>
							</div>
						</div>

						{/* Password and Confirm Password Row */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									{t('register.password')}{' '}
									<span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<Input
										id="password"
										type={
											showPassword ? 'text' : 'password'
										}
										value={formData.password}
										onChange={(e) =>
											handleInputChange(
												'password',
												e.target.value
											)
										}
										className={`w-full pr-10 ${
											passwordError
												? 'border-red-500 focus:border-red-500'
												: ''
										}`}
										placeholder="*******"
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowPassword(!showPassword)
										}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showPassword ? (
											<EyeOff size={16} />
										) : (
											<Eye size={16} />
										)}
									</button>
								</div>
							</div>
							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									{t('register.confirmPassword')}
									<span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<Input
										id="confirmPassword"
										type={
											showConfirmPassword
												? 'text'
												: 'password'
										}
										value={formData.confirmPassword}
										onChange={(e) =>
											handleInputChange(
												'confirmPassword',
												e.target.value
											)
										}
										className={`w-full pr-10 ${
											passwordError
												? 'border-red-500 focus:border-red-500'
												: ''
										}`}
										placeholder="*******"
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showConfirmPassword ? (
											<EyeOff size={16} />
										) : (
											<Eye size={16} />
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Password Error Message */}
						{passwordError && (
							<div className="text-red-500 text-sm flex items-center gap-1">
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
								{passwordError}
							</div>
						)}

						{/* Register Button */}
						<Button
							type="submit"
							className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
							disabled={isPending}
						>
							{isPending
								? t('register.registering')
								: t('register.register')}
						</Button>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									{t('register.or')}
								</span>
							</div>
						</div>

						{/* Google Sign Up */}
						<Button
							type="button"
							variant="outline"
							onClick={handleGoogleAuth}
							className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors"
						>
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							{t('register.continueWithGoogle')}
						</Button>
					</form>

					{/* Sign In Link */}
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							{t('register.alreadyHaveAccount')}{' '}
							<Link
								href="/login"
								className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
							>
								{t('register.login')}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
