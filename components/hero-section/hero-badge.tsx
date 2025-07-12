import { Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { useTranslations } from 'next-intl';

export function HeroBadge() {
  const t = useTranslations('hero');
  
  return (
    <Badge variant="secondary" className="mb-8 px-4 py-2">
      <Users className="w-4 h-4 mr-2" />
      {t('badge')}
    </Badge>
  );
}
