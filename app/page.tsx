import { Header } from '@/components/header/header';
import { HeroSection } from '@/components/hero-section/hero-section';
import { PopularPetitionSection } from '@/components/popular-petition-section/popular-petition-section';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HeroSection />
			<PopularPetitionSection />
		</div>
	);
}
