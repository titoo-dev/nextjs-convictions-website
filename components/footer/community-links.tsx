import { Facebook, Instagram, Twitter } from "lucide-react";
import { FooterSection } from "./footer-section";
import { SocialLink } from "./social-link";
import { useTranslations } from 'next-intl';

export function CommunityLinks() {
	const t = useTranslations('footer.community');

	return (
		<FooterSection title={t('title')}>
			<li>
				<SocialLink href="#" icon={Facebook} label={t('facebook')} />
			</li>
			<li>
				<SocialLink href="#" icon={Instagram} label={t('instagram')} />
			</li>
			<li>
				<SocialLink href="#" icon={Twitter} label={t('twitter')} />
			</li>
		</FooterSection>
	);
}
