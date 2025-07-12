import { MobileLanguageSelector } from './mobile-language-selector';
import { MobileNavigationButton } from './mobile-navigation-button';

export function MobileNavigation() {
	return (
		<div className="flex flex-col">
			<nav className="flex flex-col space-y-4">
				<MobileNavigationButton href="/petition/new">
					Create a petition
				</MobileNavigationButton>
				<MobileNavigationButton href="/support-us">
					Support Us
				</MobileNavigationButton>
				<MobileNavigationButton href="/login">
					Login
				</MobileNavigationButton>
			</nav>
			<MobileLanguageSelector />
		</div>
	);
}
