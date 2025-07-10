'use client';

import { FooterSection } from './footer-section';
import { FooterLink } from './footer-link';
import { usePathname } from 'next/navigation';
import { RenderWhen } from '../render-when';

export function QuickLinks() {
	const pathname = usePathname();
	const isNewPage = pathname.includes('new');

	return (
		<FooterSection title="Quick link">
			<li>
				<FooterLink href="/">Home</FooterLink>
			</li>
			<RenderWhen condition={!isNewPage}>
				<li>
					<FooterLink href="/create">Create a petition</FooterLink>
				</li>
			</RenderWhen>
			<li>
				<FooterLink href="/support">Support Us</FooterLink>
			</li>
		</FooterSection>
	);
}
