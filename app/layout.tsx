import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
});

const playfair = Playfair_Display({
	variable: '--font-playfair',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Mes convictions',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${playfair.variable} antialiased`}
			>
				<NextTopLoader
					showSpinner={false}
					shadow={false}
					color="var(--primary)"
				/>
				<Header />
				<div className="bg-background text-foreground">{children}</div>

				<Footer />
			</body>
		</html>
	);
}
