import { MobileLanguageSelector } from './mobile-language-selector';
import { MobileNavigationButton } from './mobile-navigation-button';
import { useTranslations } from 'next-intl';

export function MobileNavigation() {
	const t = useTranslations('navigation');
	
	return (
		<div className="flex flex-col">
			<nav className="flex flex-col space-y-4">
				<MobileNavigationButton href="/petition/new">
					{t('createPetition')}
				</MobileNavigationButton>
				<MobileNavigationButton href="/support-us">
					{t('supportUs')}
				</MobileNavigationButton>
				<MobileNavigationButton href="/login">
					{t('login')}
				</MobileNavigationButton>
			</nav>
			<MobileLanguageSelector />
		</div>
	);
}
