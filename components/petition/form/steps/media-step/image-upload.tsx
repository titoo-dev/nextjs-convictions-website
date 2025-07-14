import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload, XCircle } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { validateImageFile } from '@/lib/utils';
import { FileInfo } from './file-info';

type ImageUploadProps = {
	pictureUrl?: string;
	onImageUpdate: (url: string, file: File) => void;
	onImageRemove: () => void;
};

export function ImageUpload({ pictureUrl, onImageUpdate, onImageRemove }: ImageUploadProps) {
	const t = useTranslations('petition.form.mediaStep');
	const [dragActive, setDragActive] = useState(false);
	const [imageValidation, setImageValidation] = useState<{
		isValid: boolean;
		error?: string;
	} | null>(null);
	const [isLoadingImage, setIsLoadingImage] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
		if (pictureUrl && pictureUrl.startsWith('blob:')) {
			URL.revokeObjectURL(pictureUrl);
		}

		setIsLoadingImage(true);

		try {
			// Create blob URL for preview
			const localUrl = URL.createObjectURL(file);
			setUploadedFile(file);
			onImageUpdate(localUrl, file);

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

	const handleRemoveImage = () => {
		// Clean up blob URL if it exists
		if (pictureUrl && pictureUrl.startsWith('blob:')) {
			URL.revokeObjectURL(pictureUrl);
		}

		// Reset all image-related state
		setUploadedFile(null);
		setImageValidation(null);
		setIsLoadingImage(false);
		onImageRemove();
	};

	return (
		<div className="space-y-4">
			{/* File Upload - Only show if no image is loaded */}
			{(!pictureUrl || !imageValidation?.isValid) && (
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
								{isLoadingImage ? t('uploading') : t('selectFile')}
							</Button>
							<p className="text-sm text-gray-500">{t('dragAndDrop')}</p>
							<p className="text-xs text-gray-400">{t('fileFormats')}</p>
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
					<p className="text-sm text-gray-600">{t('processing')}</p>
				</div>
			)}

			{/* Image Preview */}
			{pictureUrl && imageValidation?.isValid && (
				<div className="space-y-3">
					<div className="rounded-lg border overflow-hidden relative w-full h-48 group">
						<Image
							src={pictureUrl}
							alt="Petition image preview"
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							onError={() => {
								setImageValidation({
									isValid: false,
									error: t('errors.thumbnailLoadFailed'),
								});
								if (pictureUrl && pictureUrl.startsWith('blob:')) {
									URL.revokeObjectURL(pictureUrl);
								}
							}}
							onLoad={() => {
								// Image loaded successfully
								if (!imageValidation?.isValid) {
									setImageValidation({ isValid: true });
								}
							}}
						/>
					</div>

					<FileInfo 
						file={uploadedFile} 
						onRemove={handleRemoveImage}
						type="image"
					/>
				</div>
			)}
		</div>
	);
}
