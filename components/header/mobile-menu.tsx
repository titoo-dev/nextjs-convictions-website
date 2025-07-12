import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { MobileNavigation } from "./mobile-navigation";
import { useTranslations } from 'next-intl';

export function MobileMenu() {
  const t = useTranslations('header');
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>{t('menuTitle')}</SheetTitle>
        </SheetHeader>
        <MobileNavigation />
      </SheetContent>
    </Sheet>
  );
}
