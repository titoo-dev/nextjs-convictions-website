import { getYouTubeVideoId } from '@/lib/utils';
import { PublicPetition } from '@/types/public-petition';
import Image from 'next/image';

type PetitionHeroProps = {
	petition: PublicPetition;
};

export function PetitionHero({ petition }: PetitionHeroProps) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                {petition.title}
            </h1>
            <div className="relative rounded-xl overflow-hidden">
                <div className="w-full h-64 md:h-80 bg-gray-100 overflow-hidden">
                    {petition.mediaType === 'VIDEO_YOUTUBE' &&
                    petition.videoYoutubeUrl ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                petition.videoYoutubeUrl
                            )}`}
                            title={petition.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <Image
                            src={petition.pictureUrl || '/placeholder-petition.jpg'}
                            alt={petition.title}
                            width={400}
                            height={320}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
