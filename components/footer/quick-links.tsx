'use client';

import { FooterSection } from './footer-section';
import { FooterLink } from './footer-link';
import { usePathname } from 'next/navigation';
import { RenderWhen } from '../render-when';
import { useTranslations } from 'next-intl';

export function QuickLinks() {
	const pathname = usePathname();
	const isNewPage = pathname.includes('new');
	const t = useTranslations('footer.quickLinks');

	return (
		<FooterSection title={t('title')}>
			<li>
				<FooterLink href="/">{t('home')}</FooterLink>
			</li>
			<RenderWhen condition={!isNewPage}>
				<li>
					<FooterLink href="/create">{t('createPetition')}</FooterLink>
				</li>
			</RenderWhen>
			<li>
				<FooterLink href="/support">{t('supportUs')}</FooterLink>
			</li>
		</FooterSection>
	);
}
