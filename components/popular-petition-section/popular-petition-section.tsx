
import { getPublicPetitions } from "@/actions/get-public-petitions";
import { SectionHeader } from "./section-header";
import { PetitionsGrid } from "./petition-grid";
import { ViewAllButton } from "./view-all-button";
import { Suspense } from "react";
import { PetitionGridSkeleton } from "./petition-grid-skeleton";

async function PetitionContent() {
    const { petitions: popularPetitions } = await getPublicPetitions({
        category: 'ALL',
        language: 'FR',
    });

    return <PetitionsGrid petitions={popularPetitions} />;
}

export function PopularPetitionSection() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <SectionHeader />
                <Suspense fallback={<PetitionGridSkeleton />}>
                    <PetitionContent />
                </Suspense>
                <ViewAllButton />
            </div>
        </section>
    );
}
