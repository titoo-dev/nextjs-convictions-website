'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/header/password-input';
import { GoogleLoginButton } from '@/components/header/google-login-button';
import { useTranslations } from 'next-intl';
import { signInWithEmail } from '@/actions/sign-in-with-email';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
	const tDialog = useTranslations('loginDialog');
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		startTransition(async () => {
			try {
				const result = await signInWithEmail(formData);

				if (result.success) {
					toast.success(tDialog('loginSuccess'));
					router.push('/');
				} else {
					toast.error(result.error || tDialog('loginError'));
				}
			} catch (error) {
				console.error('Login error:', error);
				toast.error(tDialog('loginError'));
			}
		});
	};

	const handleSuccess = () => {
		router.push('/');
	};

	const handleRegister = () => {
		router.push('/register');
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="w-full max-w-md">
				<div className="bg-white shadow-lg rounded-lg p-8">
					<div className="mb-8">
						<h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
							{tDialog('title')}
						</h1>
						<div className="space-y-4 mt-4">
							<div
								className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full w-20"
								aria-label={tDialog('dividerAlt')}
							/>
							<p className="text-gray-600 text-sm leading-relaxed max-w-sm text-left">
								{tDialog('description')}
							</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-700"
							>
								{tDialog('emailLabel')}
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder={tDialog('emailPlaceholder')}
								className="w-full"
								required
								disabled={isPending}
							/>
						</div>

						<PasswordInput disabled={isPending} />

						<Button
							type="submit"
							variant="outline"
							className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-2"
							disabled={isPending}
						>
							{isPending
								? tDialog('loginButtonLoading')
								: tDialog('loginButton')}
						</Button>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-gray-500">
									{tDialog('dividerText')}
								</span>
							</div>
						</div>

						<GoogleLoginButton onSuccess={handleSuccess} />

						<p className="text-center text-sm text-gray-600">
							{tDialog('noAccount')}{' '}
							<button
								type="button"
								className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
								onClick={handleRegister}
							>
								{tDialog('registerButton')}
							</button>
						</p>
					</form>

					<div className="mt-6 text-center">
						<Link
							href="/"
							className="text-sm text-gray-500 hover:text-gray-700"
						>
							← Back to home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
