'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from './password-input';
import { GoogleLoginButton } from './google-login-button';
import { useTranslations } from 'next-intl';

type LoginFormProps = {
	onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
	const tDialog = useTranslations('loginDialog');
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement login logic
		onSuccess?.();
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
					type="email"
					placeholder={tDialog('emailPlaceholder')}
					className="w-full"
					required
				/>
			</div>

			<PasswordInput />

			<Button
				type="submit"
				variant="outline"
				className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-2"
			>
				{tDialog('loginButton')}
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
