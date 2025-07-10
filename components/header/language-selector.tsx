import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function LanguageSelector() {
  return (
    <Select defaultValue="fr">
      <SelectTrigger className="w-fit border-none bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors font-medium shadow-none">
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
  );
}
