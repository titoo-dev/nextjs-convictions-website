"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function MobileLanguageSelector() {
	const [locale, setLocale] = useState('fr');
	const router = useRouter();
	const t = useTranslations('header.languages');

	const changeLocale = useCallback(
		(value: string) => {
			setLocale(value);
			document.cookie = `next-locale=${value}; path=/; max-age=31536000; SameSite=Lax`;
			router.refresh();
		},
		[router]
	);

	useEffect(() => {
		const cookieLocale = document.cookie
			.split('; ')
			.find((row) => row.startsWith('next-locale='))
			?.split('=')[1];

		if (cookieLocale) {
			setLocale(cookieLocale);
			return;
		}

		const browserLocale = navigator.language.slice(0, 2);
		const validLocale = ['en', 'fr', 'es'].includes(browserLocale)
			? browserLocale
			: 'fr';

		changeLocale(validLocale);
	}, [changeLocale]);

	const handleChange = (value: string) => {
		changeLocale(value);
	};

	return (
		<div className="pt-4 px-3 border-t">
			<Select value={locale} onValueChange={handleChange}>
				<SelectTrigger className="w-full shadow-none">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="en">
						<span>{t('english')}</span>
					</SelectItem>
					<SelectItem value="fr">
						<span>{t('french')}</span>
					</SelectItem>
					<SelectItem value="es">
						<span>{t('spanish')}</span>
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
