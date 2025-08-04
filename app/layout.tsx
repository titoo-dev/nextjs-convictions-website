import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import { Toaster } from 'sonner';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { QueryProvider } from '@/components/query-provider';
import { AuthProvider } from '@/hooks/use-auth';

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body
				className={`${inter.variable} ${playfair.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<NextTopLoader
						showSpinner={false}
						shadow={false}
						color="var(--primary)"
					/>
					<QueryProvider>
						<AuthProvider>
							<Header />
							<div className="bg-background text-foreground">
								{children}
							</div>
							<Footer />
						</AuthProvider>
						<Toaster />
					</QueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
