import { getTranslations } from 'next-intl/server';
import { LanguageSelector } from './language-selector';
import { LoginDialog } from './login-dialog';
import { NavigationButton } from './navigation-button';
import { getCurrentUser } from '@/actions/get-current-user';
import RenderWhen from '../render-when';

type Props = {
	accessToken: string | null;
};

export async function DesktopNavigation({ accessToken }: Props) {
	const t = await getTranslations('navigation');

	const currentUser = await getCurrentUser(accessToken);

	return (
		<nav className="hidden md:flex items-center space-x-4">
			<NavigationButton href="/petition/new">
				{t('createPetition')}
			</NavigationButton>
			<NavigationButton href="/support-us">
				{t('supportUs')}
			</NavigationButton>
			<RenderWhen condition={!currentUser}>
				<LoginDialog />
			</RenderWhen>
			<LanguageSelector />
		</nav>
	);
}
