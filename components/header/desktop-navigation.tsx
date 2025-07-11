import { LanguageSelector } from './language-selector';
import { NavigationButton } from './navigation-button';

export function DesktopNavigation() {
	return (
		<nav className="hidden md:flex items-center space-x-4">
			<NavigationButton href="/petition/new">
				Create a petition
			</NavigationButton>
			<NavigationButton href="/support-us">Support Us</NavigationButton>
			<NavigationButton href="/login">Login</NavigationButton>
			<LanguageSelector />
		</nav>
	);
}
