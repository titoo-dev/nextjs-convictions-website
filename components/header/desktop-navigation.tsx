import { LanguageSelector } from './language-selector';
import { LoginDialog } from './login-dialog';
import { NavigationButton } from './navigation-button';
import RenderWhen from '../render-when';
import { UserMenu } from './user-menu';
import { getCurrentUser } from '@/actions/get-current-user';
import { getTranslations } from 'next-intl/server';

export async function DesktopNavigation() {
	const t = await getTranslations('navigation');

	const currentUser = await getCurrentUser();

	return (
		<nav className="hidden md:flex items-center space-x-4">
			<NavigationButton href="/petition/new">
				{t('createPetition')}
			</NavigationButton>

			<NavigationButton href="/surveys">{t('surveys')}</NavigationButton>

			<NavigationButton href="/support-us">
				{t('supportUs')}
			</NavigationButton>

			<RenderWhen condition={!currentUser}>
				<LoginDialog />
			</RenderWhen>

			<LanguageSelector />
			<RenderWhen condition={!!currentUser}>
				<UserMenu user={currentUser!} />
			</RenderWhen>
		</nav>
	);
}
