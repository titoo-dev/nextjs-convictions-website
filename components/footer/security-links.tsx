import { FooterSection } from "./footer-section";
import { FooterLink } from "./footer-link";

export function SecurityLinks() {
	return (
		<FooterSection title="Security">
			<li>
				<FooterLink href="/privacy">Data policy</FooterLink>
			</li>
			<li>
				<FooterLink href="/terms">Terms of use</FooterLink>
			</li>
		</FooterSection>
	);
}
