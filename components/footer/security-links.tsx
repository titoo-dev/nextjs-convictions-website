import { FooterSection } from "./footer-section";
import { FooterLink } from "./footer-link";
import { useTranslations } from 'next-intl';

export function SecurityLinks() {
	const t = useTranslations('footer.security');

	return (
		<FooterSection title={t('title')}>
			<li>
				<FooterLink href="/privacy">{t('dataPolicy')}</FooterLink>
			</li>
			<li>
				<FooterLink href="/cgu">{t('termsOfUse')}</FooterLink>
			</li>
		</FooterSection>
	);
}
