import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MobileNavigationButton } from "./mobile-navigation-button";

export function MobileNavigation() {
  return (
    <nav className="flex flex-col space-y-4">
      <MobileNavigationButton>Create a petition</MobileNavigationButton>
      <MobileNavigationButton>Support Us</MobileNavigationButton>
      <MobileNavigationButton>Login</MobileNavigationButton>
      <div className="pt-4 px-3 border-t">
        <Select defaultValue="fr">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">
              <span>English</span>
            </SelectItem>
            <SelectItem value="fr">
              <span>Français</span>
            </SelectItem>
            <SelectItem value="es">
              <span>Español</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}