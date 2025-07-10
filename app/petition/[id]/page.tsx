import { PetitionHero } from '@/components/petition/petition-hero';
import { PetitionAuthor } from '@/components/petition/petition-author';
import { PetitionDetails } from '@/components/petition/petition-details';
import { PetitionContent } from '@/components/petition/petition-content';
import { SignatureCounter } from '@/components/petition/signature-counter';
import { SignForm } from '@/components/petition/sign-form';
import { ShareSection } from '@/components/petition/share-section';
import { getUniquePublicPetition } from '@/actions/get-unique-public-petition';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RenderWhen from '@/components/render-when';

export default async function PetitionPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const { petition } = await getUniquePublicPetition({ id: params.id });

    if (!petition) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Petition Not Found
                    </h1>
                    <p className="text-gray-600">
                        The petition you're looking for doesn't exist or has
                        been removed.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Back Navigation */}
                <div className="mb-6">
                    <Link 
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-4">
                        <PetitionHero petition={petition} />
                        <PetitionAuthor petition={petition} />
                        <PetitionDetails petition={petition} />
                        <PetitionContent petition={petition} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <RenderWhen condition={petition.usersSignedNumber > 0}>
                            <SignatureCounter petition={petition} />
                        </RenderWhen>
                        <SignForm petition={petition} />
                        <ShareSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
