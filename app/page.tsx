import { HeroSection } from '@/components/hero-section/hero-section';
import { PopularPetitionSection } from '@/components/popular-petition-section/popular-petition-section';

export default async function Home(props: {
	searchParams?: Promise<{
		category?: string;
	}>;
}) {
	const searchParams = await props.searchParams;

	const category = searchParams?.category || 'ALL';
	
    console.log('Search Params:', searchParams);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HeroSection />
			<PopularPetitionSection category={category} />
		</div>
	);
}
