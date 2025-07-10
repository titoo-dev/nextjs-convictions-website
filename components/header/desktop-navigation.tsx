'use client';

import { LanguageSelector } from "./language-selector";
import { NavigationButton } from "./navigation-button";
import { usePathname } from 'next/navigation';
import { RenderWhen } from '../render-when';

export function DesktopNavigation() {
  const pathname = usePathname();
  const isNewPage = pathname.includes('new');

  return (
    <nav className="hidden md:flex items-center space-x-4">
      <RenderWhen condition={!isNewPage}>
        <NavigationButton>Create a petition</NavigationButton>
      </RenderWhen>
      <NavigationButton>Support Us</NavigationButton>
      <NavigationButton>Login</NavigationButton>
      <LanguageSelector />
    </nav>
  );
}