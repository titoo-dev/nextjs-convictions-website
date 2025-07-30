'use client';

import { ChevronDown } from 'lucide-react';
import { HeroBackground } from './hero-background';
import { HeroBadge } from './hero-badge';
import { HeroCTA } from './hero-cta';
import { HeroHeading } from './hero-heading';
import { HeroSubheading } from './hero-subheading';
import { useTranslations } from 'next-intl';

export function HeroSection() {
	const t = useTranslations('hero');
	const scrollToNextSection = () => {
		const nextSection = document.querySelector('section:nth-of-type(2)');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className="relative overflow-hidden">
			<HeroBackground />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
				<div className="text-center">
					<HeroBadge />
					<HeroHeading />
					<HeroSubheading />
					<HeroCTA />
				</div>
			</div>
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
				<button
					onClick={scrollToNextSection}
					className="flex flex-col items-center p-4 cursor-pointer"
					aria-label="Scroll to next section"
				>
					<span className="text-sm mb-1">{t('scroll')}</span>
					<ChevronDown className="w-5 h-5 animate-bounce" />
				</button>
			</div>
		</section>
	);
}
