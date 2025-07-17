import { HeroSection } from '@/components/hero-section/hero-section';
import { PopularPetitionSection } from '@/components/popular-petition-section/popular-petition-section';

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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HeroSection />
			<PopularPetitionSection
				filter={{ query, page: currentPage, category }}
			/>
		</div>
	);
}
