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
import { GoogleLoginButton } from '@/components/header/google-login-button';

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

	const handleGoogleAuthSuccess = async () => {
		router.replace('/');
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
						<GoogleLoginButton
							onSuccess={handleGoogleAuthSuccess}
						/>
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
