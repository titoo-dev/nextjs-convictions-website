import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { validateYouTubeUrl } from '@/lib/utils';
import { ImageUpload } from './media-step/image-upload';
import { YouTubeVideoInput } from './media-step/youtube-video-input';
import { MediaTypeSelector } from './media-step/media-type-selector';

type PetitionData = {
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	picture: File | null;
	videoYoutubeUrl?: string;
	pictureId: string | null;
	title?: string;
	objective?: string;
	category: string;
};

type MediaStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

// Main MediaStep Component
export function MediaStep({ formData, updateFormData }: MediaStepProps) {
	const t = useTranslations('petition.form.mediaStep');

	const handleMediaTypeChange = (mediaType: 'PICTURE' | 'VIDEO_YOUTUBE') => {
		// Clean up picture data when switching away from picture
		if (mediaType !== 'PICTURE') {
			updateFormData({
				mediaType,
				picture: null,
				pictureId: null,
			});
		} else {
			updateFormData({ mediaType, videoYoutubeUrl: undefined });
		}
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
				<>
					<ImageUpload
						pictureUrl={
							formData.picture
								? URL.createObjectURL(formData.picture)
								: undefined
						}
						petitionTitle={formData.title}
						petitionObjective={formData.objective}
						category={formData.category}
						updateFormData={updateFormData}
					/>
				</>
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
	formData: Pick<PetitionData, 'mediaType' | 'picture' | 'videoYoutubeUrl'>
): boolean {
	if (formData.mediaType === 'PICTURE') {
		return !!(formData.picture && formData.picture.name.trim().length > 0);
	} else if (formData.mediaType === 'VIDEO_YOUTUBE') {
		if (!formData.videoYoutubeUrl?.trim()) return false;
		const validation = validateYouTubeUrl(formData.videoYoutubeUrl.trim());
		return validation.isValid;
	}
	return false;
}
