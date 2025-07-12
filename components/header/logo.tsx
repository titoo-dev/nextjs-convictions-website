import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';


export function Logo() {
  const t = useTranslations('header');
  
  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center space-x-2">
        <Image 
          src="/icon.png" 
          alt={t('logoAlt')} 
          width={32} 
          height={32} 
          className="h-8 w-8" 
        />
        <span className="text-xl font-bold text-gray-900">{t('logoText')}</span>
      </div>
    </Link>
  );
}