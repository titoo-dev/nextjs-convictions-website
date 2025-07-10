
import { getPublicPetitions } from "@/actions/get-public-petitions";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from 'next/image';
import Link from 'next/link';

// Utility function
const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
};

// Media Component
interface PetitionMediaProps {
    mediaType: string;
    videoYoutubeUrl?: string | null;
    pictureUrl?: string | null;
    title: string;
}

function PetitionMedia({ mediaType, videoYoutubeUrl, pictureUrl, title }: PetitionMediaProps) {
    return (
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
            {mediaType === 'VIDEO_YOUTUBE' && videoYoutubeUrl ? (
                <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoYoutubeUrl)}`}
                    title={title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <Image
                    src={pictureUrl || '/placeholder-petition.jpg'}
                    alt={title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
}

// Petition Stats Component
interface PetitionStatsProps {
    signaturesCount: number;
    petitionId: string;
}

function PetitionStats({ signaturesCount, petitionId }: PetitionStatsProps) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
                {signaturesCount} Signatures
            </span>
            <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
                asChild
            >
                <Link href={`/petition/${petitionId}`}>
                    I sign
                </Link>
            </Button>
        </div>
    );
}

// Individual Petition Card Component
interface PetitionCardProps {
    petition: {
        id: string;
        title: string;
        objective: string;
        mediaType: string;
        videoYoutubeUrl?: string | null;
        pictureUrl?: string | null;
        usersSignedNumber: number;
    };
}

function PetitionCard({ petition }: PetitionCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
            <CardHeader className="flex-1">
                <PetitionMedia
                    mediaType={petition.mediaType}
                    videoYoutubeUrl={petition.videoYoutubeUrl}
                    pictureUrl={petition.pictureUrl}
                    title={petition.title}
                />
                <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">
                    {petition.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                    {petition.objective}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <PetitionStats
                    signaturesCount={petition.usersSignedNumber}
                    petitionId={petition.id}
                />
            </CardContent>
        </Card>
    );
}

// Section Header Component
function SectionHeader() {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pétitions populaires
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez les causes qui mobilisent notre communauté et
                rejoignez le mouvement
            </p>
        </div>
    );
}

// Petitions Grid Component
interface PetitionsGridProps {
    petitions: Array<{
        id: string;
        title: string;
        objective: string;
        mediaType: string;
        videoYoutubeUrl?: string | null;
        pictureUrl?: string | null;
        usersSignedNumber: number;
    }>;
}

function PetitionsGrid({ petitions }: PetitionsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petitions.map((petition) => (
                <PetitionCard key={petition.id} petition={petition} />
            ))}
        </div>
    );
}

// View All Button Component
function ViewAllButton() {
    return (
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
                <Link href="/petitions">
                    Voir toutes les pétitions
                </Link>
            </Button>
        </div>
    );
}

// Main Component
export async function PopularPetitionSection() {
    const { petitions: popularPetitions } = await getPublicPetitions({
        category: 'ALL',
        language: 'FR',
    });

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <SectionHeader />
                <PetitionsGrid petitions={popularPetitions} />
                <ViewAllButton />
            </div>
        </section>
    );
}
