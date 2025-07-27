import {
	FilteredPetitionParams,
	getPetitions,
} from '@/actions/get-public-petitions';
import { SectionHeader } from './section-header';
import { PetitionsGrid } from './petition-grid';
import { Suspense } from 'react';
import { PetitionGridSkeleton } from './petition-grid-skeleton';
import { FilterSection } from './filter-section';
import { EmptyState } from './empty-state';
import { SearchInput } from './search-input';

type PetitionContentProps = {
	filter: FilteredPetitionParams;
};

async function PetitionContent({ filter }: PetitionContentProps) {
	const { petitions: popularPetitions } = await getPetitions({
		filter,
	});

	if (popularPetitions.length === 0) {
		return <EmptyState />;
	}

	return <PetitionsGrid petitions={popularPetitions} />;
}

type PopularPetitionSectionProps = {
	filter: FilteredPetitionParams;
};

export function PopularPetitionSection({
	filter,
}: PopularPetitionSectionProps) {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<SectionHeader />
				<SearchInput />
				<FilterSection />
				<Suspense fallback={<PetitionGridSkeleton />}>
					<PetitionContent filter={filter} />
				</Suspense>
			</div>
		</section>
	);
}
