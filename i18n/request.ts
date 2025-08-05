import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
	const cookie = await cookies();

	const browserLocale = navigator.language.split('-')[0];

	const isBrowserLocaleIncluded = ['en', 'fr', 'es'].includes(browserLocale);

	const locale =
		cookie.get('next-locale')?.value ??
		(isBrowserLocaleIncluded ? browserLocale : 'en');

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	};
});
