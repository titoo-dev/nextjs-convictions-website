import { useTranslations } from 'next-intl';

export function HeroSubheading() {
  const t = useTranslations('hero');
  
  return (
    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
      {t('subheading')}
    </p>
  );
}
