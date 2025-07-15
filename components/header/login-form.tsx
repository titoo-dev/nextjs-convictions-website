'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from './password-input';
import { GoogleLoginButton } from './google-login-button';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { signInWithEmail } from '@/actions/sign-in-with-email';
import { toast } from 'sonner';

type LoginFormProps = {
	onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
	const tDialog = useTranslations('loginDialog');
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const formData = new FormData(e.currentTarget);
		
		startTransition(async () => {
			try {
				const result = await signInWithEmail(formData);
				
				if (result.success) {
					toast.success(tDialog('loginSuccess'));
					onSuccess?.();
				} else {
					toast.error(result.error || tDialog('loginError'));
				}
			} catch (error) {
				toast.error(tDialog('loginError'));
			}
		});
	};

	return (
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
				{isPending ? tDialog('loginButtonLoading') : tDialog('loginButton')}
			</Button>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t border-gray-300" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-white px-2 text-gray-500">{tDialog('dividerText')}</span>
				</div>
			</div>

			<GoogleLoginButton onSuccess={onSuccess} />

			<p className="text-center text-sm text-gray-600">
				{tDialog('noAccount')}{' '}
				<button
					type="button"
					className="text-orange-500 hover:text-orange-600 font-medium"
				>
					{tDialog('registerButton')}
				</button>
			</p>
		</form>
	);
}
