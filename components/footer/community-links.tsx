import { Facebook, Instagram, Twitter } from "lucide-react";
import { FooterSection } from "./footer-section";
import { SocialLink } from "./social-link";

export function CommunityLinks() {
	return (
		<FooterSection title="Community">
			<li>
				<SocialLink href="#" icon={Facebook} label="Facebook" />
			</li>
			<li>
				<SocialLink href="#" icon={Instagram} label="Instagram" />
			</li>
			<li>
				<SocialLink href="#" icon={Twitter} label="X.com" />
			</li>
		</FooterSection>
	);
}
