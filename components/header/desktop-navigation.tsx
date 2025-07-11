'use client';

import { LanguageSelector } from './language-selector';
import { NavigationButton } from './navigation-button';
import { usePathname } from 'next/navigation';
import { RenderWhen } from '../render-when';

export function DesktopNavigation() {
	const pathname = usePathname();
	const isNewPage = pathname.includes('new');

	return (
		<nav className="hidden md:flex items-center space-x-4">
			<RenderWhen condition={!isNewPage}>
				<NavigationButton href="/petition/new">
					Create a petition
				</NavigationButton>
			</RenderWhen>
			<NavigationButton href="/support-us">Support Us</NavigationButton>
			<NavigationButton href="/login">Login</NavigationButton>
			<LanguageSelector />
		</nav>
	);
}
