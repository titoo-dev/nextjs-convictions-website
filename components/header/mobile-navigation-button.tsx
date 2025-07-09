import { Button } from "../ui/button";

export function MobileNavigationButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900 transition-colors font-medium">
      {children}
    </Button>
  );
}
