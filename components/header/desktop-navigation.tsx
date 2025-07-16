"use client";

import { useTranslations } from 'next-intl';
import { LanguageSelector } from './language-selector';
import { LoginDialog } from './login-dialog';
import { NavigationButton } from './navigation-button';
import RenderWhen from '../render-when';
import { useGetCurrentUser } from '@/hooks/use-get-current-user';
import { Skeleton } from '../ui/skeleton';
import { useEffect } from 'react';
import { userLocalStorage } from '@/lib/local-storage';

export function DesktopNavigation() {
	const t = useTranslations('navigation');

	const { data: currentUser, isLoading, isSuccess } = useGetCurrentUser();

	useEffect(() => {
		if (isSuccess && currentUser) {
			userLocalStorage.saveUser(currentUser);
		}
	}, [isSuccess, currentUser]);

	return (
		<nav className="hidden md:flex items-center space-x-4">
			<NavigationButton href="/petition/new">
				{t('createPetition')}
			</NavigationButton>
			<NavigationButton href="/support-us">
				{t('supportUs')}
			</NavigationButton>
			<RenderWhen condition={isLoading}>
				<Skeleton className="h-10 w-32" />
			</RenderWhen>

			<RenderWhen condition={!isLoading && !currentUser}>
				<LoginDialog />
			</RenderWhen>
			<LanguageSelector />
		</nav>
	);
}