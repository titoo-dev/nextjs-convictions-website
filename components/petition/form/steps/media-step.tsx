import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { validateYouTubeUrl } from '@/lib/utils';
import { base64ToFile } from '@/lib/local-storage';
import { ImageUpload } from './media-step/image-upload';
import { YouTubeVideoInput } from './media-step/youtube-video-input';
import { MediaTypeSelector } from './media-step/media-type-selector';

type PetitionData = {
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	pictureUrl?: string;
	pictureFileData?: string;
	pictureFileName?: string;
	pictureFileType?: string;
	pictureFileSize?: number;
	videoYoutubeUrl?: string;
};

type MediaStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
	onFileUpdate?: (file: File) => void;
};

// Main MediaStep Component
export function MediaStep({ formData, updateFormData, onFileUpdate }: MediaStepProps) {
	const t = useTranslations('petition.form.mediaStep');
	const [restoredFile, setRestoredFile] = useState<File | null>(null);
	const [isRestoring, setIsRestoring] = useState(false);

	// Restore file from base64 data on mount
	useEffect(() => {
		if (
			formData.mediaType === 'PICTURE' &&
			formData.pictureFileData &&
			formData.pictureFileName &&
			formData.pictureFileType &&
			!restoredFile &&
			!isRestoring
		) {
			setIsRestoring(true);
			
			const restoreFile = async () => {
				try {
					const file = base64ToFile(
						formData.pictureFileData!,
						formData.pictureFileName!,
						formData.pictureFileType!
					);
					
					// Create a new blob URL for the restored file
					const blobUrl = URL.createObjectURL(file);
					
					// Test if the blob URL works
					const img = new Image();
					img.onload = () => {
						setRestoredFile(file);
						updateFormData({ pictureUrl: blobUrl });
						onFileUpdate?.(file);
						setIsRestoring(false);
					};
					img.onerror = () => {
						console.error('Failed to load restored image');
						URL.revokeObjectURL(blobUrl);
						// Clean up corrupted data
						updateFormData({
							pictureFileData: undefined,
							pictureFileName: undefined,
							pictureFileType: undefined,
							pictureFileSize: undefined,
							pictureUrl: undefined,
						});
						setIsRestoring(false);
					};
					img.src = blobUrl;
					
				} catch (error) {
					console.error('Failed to restore file from localStorage:', error);
					// Clean up corrupted data
					updateFormData({
						pictureFileData: undefined,
						pictureFileName: undefined,
						pictureFileType: undefined,
						pictureFileSize: undefined,
						pictureUrl: undefined,
					});
					setIsRestoring(false);
				}
			};
			
			restoreFile();
		}
	}, [
		formData.mediaType, 
		formData.pictureFileData, 
		formData.pictureFileName, 
		formData.pictureFileType,
		restoredFile, 
		isRestoring,
		updateFormData,
		onFileUpdate
	]);

	// Clean up blob URLs when component unmounts
	useEffect(() => {
		return () => {
			if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
				URL.revokeObjectURL(formData.pictureUrl);
			}
		};
	}, [formData.pictureUrl]);

	const handleMediaTypeChange = (mediaType: 'PICTURE' | 'VIDEO_YOUTUBE') => {
		// Clean up picture data when switching away from picture
		if (mediaType !== 'PICTURE') {
			updateFormData({
				mediaType,
				pictureUrl: undefined,
				pictureFileData: undefined,
				pictureFileName: undefined,
				pictureFileType: undefined,
				pictureFileSize: undefined,
			});
		} else {
			updateFormData({ mediaType });
		}
	};

	const handleImageUpdate = (url: string, file: File) => {
		updateFormData({ pictureUrl: url });
		setRestoredFile(file);
		onFileUpdate?.(file);
	};

	const handleImageRemove = () => {
		// Clean up blob URL if it exists
		if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
			URL.revokeObjectURL(formData.pictureUrl);
		}
		
		updateFormData({
			pictureUrl: undefined,
			pictureFileData: undefined,
			pictureFileName: undefined,
			pictureFileType: undefined,
			pictureFileSize: undefined,
		});
		setRestoredFile(null);
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
					{isRestoring && (
						<div className="rounded-lg border p-8 text-center">
							<div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
							<p className="text-sm text-gray-600">{t('restoringImage')}</p>
						</div>
					)}
					{!isRestoring && (
						<ImageUpload 
							// Prefer base64 data if available, else use pictureUrl
							pictureUrl={formData.pictureFileData || formData.pictureUrl}
							onImageUpdate={handleImageUpdate}
							onImageRemove={handleImageRemove}
							initialFile={restoredFile}
						/>
					)}
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