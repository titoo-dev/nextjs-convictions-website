import { getYouTubeVideoId } from '@/lib/utils';
import { PublicPetition } from '@/schemas/public-petition';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type PetitionHeroProps = {
	petition: PublicPetition;
};

export function PetitionHero({ petition }: PetitionHeroProps) {
    const t = useTranslations('petition.hero');
    
    return (
        <div className="space-y-4 md:space-y-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {petition.title}
            </h1>
            <div className="relative rounded-lg md:rounded-xl overflow-hidden">
                <div className="w-full h-48 sm:h-56 md:h-64 lg:h-80 bg-gray-100 overflow-hidden">
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
                            src={petition.pictureUrl || t('placeholderImage')}
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
