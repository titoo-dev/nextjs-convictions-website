import { getPublicPetitions } from '@/actions/get-public-petitions';
import { SectionHeader } from './section-header';
import { PetitionsGrid } from './petition-grid';
import { Suspense } from 'react';
import { PetitionGridSkeleton } from './petition-grid-skeleton';
import { FilterSection } from './filter-section';
import { EmptyState } from './empty-state';
import { getLocale } from 'next-intl/server';
import { SearchInput } from './search-input';

type PetitionContentProps = {
	category?: string;
};

async function PetitionContent({ category }: PetitionContentProps) {
	const locale = await getLocale();
	const { petitions: popularPetitions } = await getPublicPetitions({
		category: category || 'ALL',
		language: locale.toUpperCase() as 'FR' | 'EN' | 'ES',
	});

	if (popularPetitions.length === 0) {
		return <EmptyState />;
	}

	return <PetitionsGrid petitions={popularPetitions} />;
}

type PopularPetitionSectionProps = {
	category?: string;
};

export function PopularPetitionSection({
	category,
}: PopularPetitionSectionProps) {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<SectionHeader />
				<SearchInput />
				<FilterSection />
				<Suspense fallback={<PetitionGridSkeleton />}>
					<PetitionContent category={category} />
				</Suspense>
			</div>
		</section>
	);
}
