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

import { ReactNode, isValidElement } from 'react';

type LoginDialogProps = {
	/**
	 * Optional custom trigger component. If not provided, a default login button is used.
	 */
	trigger?: ReactNode;
};

export function LoginDialog({ trigger }: LoginDialogProps) {
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

	const defaultTrigger = (
		<Button
			variant="outline"
			size="default"
			className="border-none shadow-none cursor-pointer"
		>
			{tNavigation('login')}
		</Button>
	);

	/**
	 * If a custom trigger is provided, ensure it can receive ref and onClick via asChild.
	 * Otherwise, use the default trigger button.
	 */
	const triggerElement =
		trigger && isValidElement(trigger) ? trigger : defaultTrigger;

	return (
		<Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
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
