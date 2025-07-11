import { Button } from "../ui/button";
import Link from "next/link";

type NavigationButtonProps = {
  children: React.ReactNode;
  href: string;
};

export function NavigationButton({ children, href }: NavigationButtonProps) {
  return (
    <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
}