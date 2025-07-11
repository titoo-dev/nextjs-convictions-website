'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

type MobileNavigationButtonProps = {
	children: React.ReactNode;
	href: string;
};

export function MobileNavigationButton({
	children,
	href,
}: MobileNavigationButtonProps) {
	const pathname = usePathname();
	const isActive = pathname === href || pathname.startsWith(href);

	return (
		<Button
			asChild
			variant="ghost"
			className={`justify-start text-gray-600 hover:text-gray-900 transition-colors font-medium rounded-none ${
				isActive ? 'bg-gray-100' : ''
			}`}
		>
			<Link href={href}>{children}</Link>
		</Button>
	);
}
