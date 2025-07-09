import { Button } from "../ui/button";

export function NavigationButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
      {children}
    </Button>
  );
}