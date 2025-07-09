import { LanguageSelector } from "./language-selector";
import { NavigationButton } from "./navigation-button";

export function DesktopNavigation() {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <NavigationButton>Create a petition</NavigationButton>
      <NavigationButton>Support Us</NavigationButton>
      <NavigationButton>Login</NavigationButton>
      <LanguageSelector />
    </nav>
  );
}