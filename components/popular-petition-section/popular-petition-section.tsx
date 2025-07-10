import { getPublicPetitions } from "@/actions/get-public-petitions";
import { SectionHeader } from "./section-header";
import { PetitionsGrid } from "./petition-grid";
import { Suspense } from "react";
import { PetitionGridSkeleton } from "./petition-grid-skeleton";
import { FilterSection } from "./filter-section";
import { EmptyState } from "./empty-state";

type PetitionContentProps = {
    category?: string;
};

async function PetitionContent({ category }: PetitionContentProps) {
    const { petitions: popularPetitions } = await getPublicPetitions({
        category: category || 'ALL',
        language: 'FR',
    });

    if (popularPetitions.length === 0) {
        return <EmptyState />;
    }

    return <PetitionsGrid petitions={popularPetitions} />;
}


type PopularPetitionSectionProps = {
    category?: string;
};

export function PopularPetitionSection({ category }: PopularPetitionSectionProps) {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <SectionHeader />
                <FilterSection />
                <Suspense fallback={<PetitionGridSkeleton />}>
                    <PetitionContent category={category} />
                </Suspense>
                {/* <ViewAllButton /> */}
            </div>
        </section>
    );
}
