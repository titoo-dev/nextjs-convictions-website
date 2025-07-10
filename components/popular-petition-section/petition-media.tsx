import { getYouTubeVideoId } from '@/lib/utils';
import Image from 'next/image';

// Media Component
interface PetitionMediaProps {
	mediaType: string;
	videoYoutubeUrl?: string | null;
	pictureUrl?: string | null;
	title: string;
}

export function PetitionMedia({
	mediaType,
	videoYoutubeUrl,
	pictureUrl,
	title,
}: PetitionMediaProps) {
	return (
		<div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
			{mediaType === 'VIDEO_YOUTUBE' && videoYoutubeUrl ? (
				<iframe
					src={`https://www.youtube.com/embed/${getYouTubeVideoId(
						videoYoutubeUrl
					)}`}
					title={title}
					className="w-full h-full"
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
