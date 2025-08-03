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
		<div className="relative w-full h-48">
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
			) : pictureUrl ? (
				<Image
					src={pictureUrl}
					alt={title}
					fill
					className="object-cover"
				/>
			) : (
				<div className="w-full h-full bg-gray-50 flex items-center justify-center">
					<svg
						className="w-16 h-16 text-gray-300"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			)}
		</div>
	);
}
