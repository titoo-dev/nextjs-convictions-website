import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { validateYouTubeUrl } from '@/lib/utils';
import { ImageUpload } from './media-step/image-upload';
import { YouTubeVideoInput } from './media-step/youtube-video-input';
import { MediaTypeSelector } from './media-step/media-type-selector';

type PetitionData = {
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	pictureUrl?: string;
	videoYoutubeUrl?: string;
};

type MediaStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

// Main MediaStep Component
export function MediaStep({ formData, updateFormData }: MediaStepProps) {
	const t = useTranslations('petition.form.mediaStep');

	// Clean up blob URLs when component unmounts
	useEffect(() => {
		return () => {
			if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
				URL.revokeObjectURL(formData.pictureUrl);
			}
		};
	}, [formData.pictureUrl]);

	const handleMediaTypeChange = (mediaType: 'PICTURE' | 'VIDEO_YOUTUBE') => {
		updateFormData({ mediaType });
	};

	const handleImageUpdate = (url: string, file: File) => {
		updateFormData({ pictureUrl: url });
	};

	const handleImageRemove = () => {
		updateFormData({ pictureUrl: undefined });
	};

	const handleYouTubeUrlChange = (url: string) => {
		updateFormData({ videoYoutubeUrl: url });
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
				<p className="text-gray-600 mb-6">{t('description')}</p>
			</div>

			{/* Media Type Selection */}
			<MediaTypeSelector 
				selectedType={formData.mediaType}
				onTypeChange={handleMediaTypeChange}
			/>

			{/* Image Upload Section */}
			{formData.mediaType === 'PICTURE' && (
				<ImageUpload 
					pictureUrl={formData.pictureUrl}
					onImageUpdate={handleImageUpdate}
					onImageRemove={handleImageRemove}
				/>
			)}

			{/* YouTube Video Section */}
			{formData.mediaType === 'VIDEO_YOUTUBE' && (
				<YouTubeVideoInput 
					videoUrl={formData.videoYoutubeUrl}
					onUrlChange={handleYouTubeUrlChange}
				/>
			)}

			{/* Advisory Alert */}
			<Alert className="bg-orange-50 border-orange-200">
				<AlertTriangle className="h-4 w-4 text-orange-600" />
				<AlertDescription className="text-orange-700">
					<strong>{t('advice')}</strong> {t('adviceText')}
				</AlertDescription>
			</Alert>
		</div>
	);
}

// Add validation function for media step
export function validateMediaStep(
	formData: Pick<PetitionData, 'mediaType' | 'pictureUrl' | 'videoYoutubeUrl'>
): boolean {
	if (formData.mediaType === 'PICTURE') {
		return !!(formData.pictureUrl && formData.pictureUrl.trim().length > 0);
	} else if (formData.mediaType === 'VIDEO_YOUTUBE') {
		if (!formData.videoYoutubeUrl?.trim()) return false;
		const validation = validateYouTubeUrl(formData.videoYoutubeUrl.trim());
		return validation.isValid;
	}
	return false;
}