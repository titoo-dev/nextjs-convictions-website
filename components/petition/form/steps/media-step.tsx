import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	Image as ImageIcon,
	Upload,
	AlertTriangle,
	CheckCircle,
	XCircle,
	X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
	validateYouTubeUrl,
	validateImageFile,
} from '@/lib/utils';

type PetitionData = {
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	pictureUrl?: string;
	videoYoutubeUrl?: string;
};

type MediaStepProps = {
	formData: PetitionData;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

export function MediaStep({ formData, updateFormData }: MediaStepProps) {
	const t = useTranslations('petition.form.mediaStep');
	const [dragActive, setDragActive] = useState(false);
	const [imageValidation, setImageValidation] = useState<{
		isValid: boolean;
		error?: string;
	} | null>(null);
	const [youtubeValidation, setYoutubeValidation] = useState<{
		isValid: boolean;
		error?: string;
		videoId?: string;
	} | null>(null);
	const [isLoadingImage, setIsLoadingImage] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);

	// Clean up blob URLs when component unmounts or when new file is uploaded
	useEffect(() => {
		return () => {
			if (
				formData.pictureUrl &&
				formData.pictureUrl.startsWith('blob:')
			) {
				URL.revokeObjectURL(formData.pictureUrl);
			}
		};
	}, [formData.pictureUrl]);

	// Validate YouTube URL when it changes
	useEffect(() => {
		if (
			formData.mediaType === 'VIDEO_YOUTUBE' &&
			formData.videoYoutubeUrl?.trim()
		) {
			const validation = validateYouTubeUrl(
				formData.videoYoutubeUrl.trim()
			);
			setYoutubeValidation(validation);
		} else {
			setYoutubeValidation(null);
		}
	}, [formData.videoYoutubeUrl, formData.mediaType]);

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const files = e.dataTransfer.files;
		if (files && files[0]) {
			handleFileUpload(files[0]);
		}
	};

	const handleFileUpload = (file: File) => {
		const validation = validateImageFile(file);

		if (!validation.isValid) {
			setImageValidation(validation);
			return;
		}

		// Clean up previous blob URL if it exists
		if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
			URL.revokeObjectURL(formData.pictureUrl);
		}

		setIsLoadingImage(true);

		try {
			// Create blob URL for preview
			const localUrl = URL.createObjectURL(file);
			setUploadedFile(file);
			updateFormData({ pictureUrl: localUrl });

			// Test if the blob URL works by creating an image
			const img = new window.Image();
			img.onload = () => {
				setIsLoadingImage(false);
				setImageValidation({ isValid: true });
			};
			img.onerror = () => {
				setIsLoadingImage(false);
				setImageValidation({
					isValid: false,
					error: t('errors.thumbnailLoadFailed'),
				});
				URL.revokeObjectURL(localUrl);
			};
			img.src = localUrl;
		} catch (error) {
			console.error('Error processing file upload:', error);
			setIsLoadingImage(false);
			setImageValidation({
				isValid: false,
				error: t('errors.processFailed'),
			});
		}
	};

	const handleRemoveImage = () => {
		// Clean up blob URL if it exists
		if (formData.pictureUrl && formData.pictureUrl.startsWith('blob:')) {
			URL.revokeObjectURL(formData.pictureUrl);
		}

		// Reset all image-related state
		updateFormData({ pictureUrl: undefined });
		setUploadedFile(null);
		setImageValidation(null);
		setIsLoadingImage(false);
	};

	const handleFileSelect = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.style.display = 'none';

		const handleFileChange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			const file = target.files?.[0];
			if (file) {
				handleFileUpload(file);
			}
			// Clean up
			document.body.removeChild(input);
		};

		input.addEventListener('change', handleFileChange);
		document.body.appendChild(input);
		input.click();
	};

	const getValidationIcon = (
		validation: { isValid: boolean; error?: string } | null,
		isLoading: boolean = false
	) => {
		if (isLoading)
			return (
				<div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
			);
		if (!validation) return null;
		return validation.isValid ? (
			<CheckCircle className="w-4 h-4 text-green-500" />
		) : (
			<XCircle className="w-4 h-4 text-red-500" />
		);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
				<p className="text-gray-600 mb-6">{t('description')}</p>
			</div>

			{/* Media Type Selection */}
			<div className="space-y-4">
				<p className="text-sm font-medium text-gray-700">
					{t('mediaType')}
				</p>

				<div className="space-y-3">
					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							type="radio"
							name="mediaType"
							value="PICTURE"
							checked={formData.mediaType === 'PICTURE'}
							onChange={() =>
								updateFormData({ mediaType: 'PICTURE' })
							}
							className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
						/>
						<span className="text-gray-900 group-hover:text-gray-700 transition-colors">
							{t('image')}
						</span>
					</label>

					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							type="radio"
							name="mediaType"
							value="VIDEO_YOUTUBE"
							checked={formData.mediaType === 'VIDEO_YOUTUBE'}
							onChange={() =>
								updateFormData({ mediaType: 'VIDEO_YOUTUBE' })
							}
							className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
						/>
						<span className="text-gray-900 group-hover:text-gray-700 transition-colors">
							{t('videoYoutube')}
						</span>
					</label>
				</div>
			</div>

			{/* Image Upload Section */}
			{formData.mediaType === 'PICTURE' && (
				<div className="space-y-4">
					{/* File Upload - Only show if no image is loaded */}
					{(!formData.pictureUrl || !imageValidation?.isValid) && (
						<div
							className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
								dragActive
									? 'border-orange-400 bg-orange-50 scale-105'
									: 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
							}`}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						>
							<div className="flex flex-col items-center justify-center space-y-4">
								<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
									<ImageIcon className="w-8 h-8 text-gray-400" />
								</div>
								<div className="flex flex-col items-center space-y-2 text-center">
									<Button
										type="button"
										variant="outline"
										className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300"
										onClick={handleFileSelect}
										disabled={isLoadingImage}
									>
										<Upload className="w-4 h-4" />
										{isLoadingImage
											? t('uploading')
											: t('selectFile')}
									</Button>
									<p className="text-sm text-gray-500">
										{t('dragAndDrop')}
									</p>
									<p className="text-xs text-gray-400">
										{t('fileFormats')}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Image Validation Error */}
					{imageValidation && imageValidation.error && (
						<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600 flex items-center gap-2">
								<XCircle className="w-4 h-4" />
								{imageValidation.error}
							</p>
						</div>
					)}

					{/* Loading State */}
					{isLoadingImage && (
						<div className="rounded-lg border p-8 text-center">
							<div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
							<p className="text-sm text-gray-600">
								{t('processing')}
							</p>
						</div>
					)}

					{/* Image Preview */}
					{formData.pictureUrl && imageValidation?.isValid && (
						<div className="space-y-3">
							<div className="rounded-lg border overflow-hidden relative w-full h-48 group">
								<Image
									src={formData.pictureUrl}
									alt="Petition image preview"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									onError={() => {
										setImageValidation({
											isValid: false,
											error: t(
												'errors.thumbnailLoadFailed'
											),
										});
										if (
											formData.pictureUrl &&
											formData.pictureUrl.startsWith(
												'blob:'
											)
										) {
											URL.revokeObjectURL(
												formData.pictureUrl
											);
										}
									}}
									onLoad={() => {
										// Image loaded successfully
										if (!imageValidation?.isValid) {
											setImageValidation({
												isValid: true,
											});
										}
									}}
								/>
							</div>

							<div className="flex items-center justify-between">
								{uploadedFile && (
									<div className="text-xs text-gray-500">
										<span>
											{t('fileInfo.file')}:{' '}
											{uploadedFile.name}
										</span>
										<span className="ml-4">
											{t('fileInfo.size')}:{' '}
											{(
												uploadedFile.size /
												1024 /
												1024
											).toFixed(2)}{' '}
											MB
										</span>
									</div>
								)}
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
									onClick={handleRemoveImage}
								>
									<X className="w-3 h-3" />
									{t('removeImage')}
								</Button>
							</div>
						</div>
					)}
				</div>
			)}

			{/* YouTube Video Section */}
			{formData.mediaType === 'VIDEO_YOUTUBE' && (
				<div className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700">
							{t('youtubeUrl')}
						</label>
						<div className="relative">
							<Input
								placeholder={t('youtubeUrlPlaceholder')}
								value={formData.videoYoutubeUrl || ''}
								onChange={(e) =>
									updateFormData({
										videoYoutubeUrl: e.target.value,
									})
								}
								className={`pr-10 ${
									youtubeValidation &&
									!youtubeValidation.isValid
										? 'border-red-300 focus:border-red-500 focus:ring-red-500'
										: youtubeValidation &&
										  youtubeValidation.isValid
										? 'border-green-300 focus:border-green-500 focus:ring-green-500'
										: ''
								}`}
							/>
							<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
								{getValidationIcon(youtubeValidation)}
							</div>
						</div>
						{youtubeValidation && youtubeValidation.error && (
							<p className="text-sm text-red-600 flex items-center gap-1">
								<XCircle className="w-3 h-3" />
								{youtubeValidation.error}
							</p>
						)}
						{youtubeValidation && youtubeValidation.isValid && (
							<p className="text-sm text-green-600 flex items-center gap-1">
								<CheckCircle className="w-3 h-3" />
								{t('validYoutubeUrl')}
							</p>
						)}
					</div>

					{/* YouTube Preview */}
					{youtubeValidation?.isValid &&
						youtubeValidation.videoId && (
							<div className="space-y-3">
								<div className="rounded-lg border overflow-hidden bg-gray-100 relative w-full h-48 group">
									<iframe
										src={`https://www.youtube.com/embed/${youtubeValidation.videoId}`}
										title="YouTube video preview"
										className="w-full h-full"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
								<div className="flex items-center justify-between">
									<div className="text-xs text-gray-500">
										<span>
											{t('fileInfo.videoId')}:{' '}
											{youtubeValidation.videoId}
										</span>
									</div>
								</div>
							</div>
						)}
				</div>
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