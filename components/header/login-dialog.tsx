'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { LoginForm } from './login-form';
import { useQueryClient } from '@tanstack/react-query';

export function LoginDialog() {
	const tNavigation = useTranslations('navigation');
	const tDialog = useTranslations('loginDialog');
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleSuccess = () => {
		setIsLoginOpen(false);
		queryClient.invalidateQueries({
			queryKey: ['currentUser'],
		});
	};

	return (
		<Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="default"
					className="border-none shadow-none cursor-pointer"
				>
					{tNavigation('login')}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mr-auto">
						{tDialog('title')}
					</DialogTitle>
					<div className="space-y-4">
						<div
							className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full w-20 mr-auto"
							aria-label={tDialog('dividerAlt')}
						/>
						<p className="text-gray-600 text-sm leading-relaxed max-w-sm mr-auto text-left">
							{tDialog('description')}
						</p>
					</div>
				</DialogHeader>
				<LoginForm onSuccess={handleSuccess} />
			</DialogContent>
		</Dialog>
	);
}
