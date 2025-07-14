'use client'

import { LanguageSelector } from './language-selector';
import { LoginDialog } from './login-dialog';
import { NavigationButton } from './navigation-button';
import { useTranslations } from 'next-intl';

export function DesktopNavigation() {
	const t = useTranslations('navigation');
	
	return (
		<nav className="hidden md:flex items-center space-x-4">
			<NavigationButton href="/petition/new">
				{t('createPetition')}
			</NavigationButton>
			<NavigationButton href="/support-us">
				{t('supportUs')}
			</NavigationButton>
			<LoginDialog />
			<LanguageSelector />
		</nav>
	);
}