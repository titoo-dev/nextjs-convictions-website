import { useTranslations } from 'next-intl';

export function HeroHeading() {
  const t = useTranslations('hero.heading');
  
  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
      {t('makeYourVoice')}{" "}
      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {t('heard')}
      </span>
    </h1>
  );
}