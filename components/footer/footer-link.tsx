"use client";

import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/link";

type FooterLinkProps = {
	href: string;
	children: React.ReactNode;
	external?: boolean;
};

export function FooterLink({ href, children, external = false }: FooterLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	if (isActive) return null;

	if (external) {
		return (
			<a
				href={href}
				className="hover:text-white transition-colors"
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className="hover:text-white transition-colors">
			{children}
		</Link>
	);
}
