import { HeroSection } from '@/components/hero-section/hero-section';
import { PopularPetitionSection } from '@/components/popular-petition-section/popular-petition-section';
import Head from 'next/head';

export default async function Home(props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
		category?: string;
	}>;
}) {
	const searchParams = await props.searchParams;

	const category = searchParams?.category ?? 'ALL';
	const query = searchParams?.search ?? '';
	const currentPage = Number(searchParams?.page) || 1;

	return (
		<>
			<Head>
				<title>Convictions - Change the world with a petition</title>
				<meta
					name="description"
					content="Create and sign petitions to make a change in the world."
				/>
				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Convictions - Change the world with a petition"
				/>
				<meta
					property="og:description"
					content="Create and sign petitions to make a change in the world."
				/>
				<meta
					property="og:image"
					content="/icon.png" // Replace with your actual logo path
				/>
				<meta
					property="og:url"
					content="https://nextjs-convictions-website.vercel.app"
				/>

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Convictions - Change the world with a petition"
				/>
				<meta
					name="twitter:description"
					content="Create and sign petitions to make a change in the world."
				/>
				<meta name="twitter:image" content="/icon.png" />

				{/* WhatsApp */}
				<meta property="og:site_name" content="Convictions" />
				<meta
					property="og:description"
					content="Create and sign petitions to make a change in the world."
				/>

				{/* Instagram - While Instagram doesn't directly use meta tags, these can help with sharing to other platforms */}
				<meta name="instagram:title" content="Convictions" />
				<meta
					name="instagram:description"
					content="Create and sign petitions to make a change in the world."
				/>

				{/* Email - These are generally not used for direct email sharing, but can help with context when the link is shared via email */}
				<meta name="email:title" content="Convictions" />
				<meta
					name="email:description"
					content="Create and sign petitions to make a change in the world."
				/>

				<link
					rel="canonical"
					href="https://nextjs-convictions-website.vercel.app"
				/>
				{/* Add more meta tags as needed */}
			</Head>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
				<HeroSection />
				<PopularPetitionSection
					filter={{ query, page: currentPage, category }}
				/>
			</div>
		</>
	);
}
