'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { LoginForm } from './login-form';

export function LoginDialog() {
	const t = useTranslations('navigation');
	const [isLoginOpen, setIsLoginOpen] = useState(false);

	return (
		<Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="default"
					className="border-none shadow-none cursor-pointer"
				>
					{t('login')}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="space-y-4">
					<DialogTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mr-auto">
						Welcome Back
					</DialogTitle>
					<div className="space-y-2">
						<div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full w-20 mr-auto" />
						<p className="text-gray-600 text-sm leading-relaxed max-w-sm mr-auto text-left">
							Sign in to your account to create petitions,
							support causes, and make your voice heard in the
							community.
						</p>
					</div>
				</DialogHeader>
				<LoginForm onSuccess={() => setIsLoginOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
