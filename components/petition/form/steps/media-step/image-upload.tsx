import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type PetitionData = {
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	picture: File | null;
	videoYoutubeUrl?: string;
};

type ImageUploadProps = {
	pictureUrl?: string;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

export function ImageUpload({ pictureUrl, updateFormData }: ImageUploadProps) {
	const t = useTranslations('petition.form.mediaStep');
	const [dragActive, setDragActive] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		pictureUrl || null
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFile = (file: File) => {
		if (!file.type.startsWith('image/')) return;

		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		updateFormData({ picture: file });
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(e.type === 'dragenter' || e.type === 'dragover');
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const file = e.dataTransfer.files?.[0];
		if (file) handleFile(file);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	const handleRemove = () => {
		if (previewUrl?.startsWith('blob:')) {
			URL.revokeObjectURL(previewUrl);
		}
		setPreviewUrl(null);
		updateFormData({ picture: null });
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className="space-y-4">
			{!previewUrl ? (
				<div
					className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
						dragActive
							? 'border-orange-400 bg-orange-50'
							: 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					onClick={() => fileInputRef.current?.click()}
				>
					<div className="flex flex-col items-center space-y-4">
						<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
							<ImageIcon className="w-8 h-8 text-gray-400" />
						</div>
						<div className="space-y-2 flex flex-col items-center">
							<Button
								type="button"
								variant="outline"
								className="flex items-center gap-2"
							>
								<Upload className="w-4 h-4" />
								{t('selectFile')}
							</Button>
							<p className="text-sm text-gray-500">
								{t('dragAndDrop')}
							</p>
							<p className="text-xs text-gray-400">
								{t('fileFormats')}
							</p>
						</div>
					</div>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						className="hidden"
					/>
				</div>
			) : (
				<div className="space-y-3">
					<div className="relative rounded-lg border overflow-hidden">
						<Image
							src={previewUrl}
							alt="Preview"
							width={400}
							height={200}
							className="w-full h-48 object-cover"
							unoptimized
						/>
						<Button
							type="button"
							variant="destructive"
							size="sm"
							className="absolute top-2 right-2"
							onClick={handleRemove}
						>
							<X className="w-4 h-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
