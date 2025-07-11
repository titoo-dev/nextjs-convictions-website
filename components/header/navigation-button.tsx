'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationButtonProps = {
	children: React.ReactNode;
	href: string;
};

export function NavigationButton({ children, href }: NavigationButtonProps) {
	const pathname = usePathname();
	const isActive = pathname === href || pathname.startsWith(href);

	return (
		<Button
			asChild
			variant="ghost"
			className={`text-gray-600 hover:text-gray-900 transition-colors font-medium ${
				isActive ? 'border border-gray-300' : ''
			}`}
		>
			<Link href={href}>{children}</Link>
		</Button>
	);
}
