import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload, X, Wand2 } from 'lucide-react';
import { useState, useRef, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { getOpenaiImage } from '@/actions/get-openai-image';
import { Progress } from '@/components/ui/progress';

type PetitionData = {
	mediaType: 'PICTURE' | 'VIDEO_YOUTUBE';
	picture: File | null;
	videoYoutubeUrl?: string;
};

type ImageUploadProps = {
	pictureUrl?: string;
	petitionTitle?: string;
	petitionObjective?: string;
	category: string;
	updateFormData: (updates: Partial<PetitionData>) => void;
};

export function ImageUpload({
	pictureUrl,
	petitionTitle,
	petitionObjective,
	category,
	updateFormData,
}: ImageUploadProps) {
	const t = useTranslations('petition.form.mediaStep');
	const [dragActive, setDragActive] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		pictureUrl || null
	);
	const [isPending, startTransition] = useTransition();
	const [progressValue, setProgressValue] = useState(0);
	const [isGenerating, setIsGenerating] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

	// Fonction pour calculer la progression avec une courbe d'accélération
	const calculateProgress = (elapsedTime: number, totalDuration: number) => {
		// Courbe d'accélération : rapide au début, ralentit vers la fin
		const progress = Math.min(elapsedTime / totalDuration, 0.95);
		// Appliquer une courbe d'easing pour ralentir vers la fin
		return Math.pow(progress, 0.7) * 95; // 95% max pour laisser de la marge
	};

	// Effet pour gérer l'animation de progression
	useEffect(() => {
		if (isGenerating) {
			const startTime = Date.now();
			const totalDuration = 20000; // 20 secondes

			progressIntervalRef.current = setInterval(() => {
				const elapsedTime = Date.now() - startTime;
				const newProgress = calculateProgress(
					elapsedTime,
					totalDuration
				);
				setProgressValue(newProgress);
			}, 100);

			return () => {
				if (progressIntervalRef.current) {
					clearInterval(progressIntervalRef.current);
				}
			};
		} else {
			setProgressValue(0);
		}
	}, [isGenerating]);

	const handleGenerateAIImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!petitionTitle && !petitionObjective) {
			toast.error(
				t('aiImageRequiredFields') ||
					'Please add a title and objective first'
			);
			return;
		}

		setIsGenerating(true);
		setProgressValue(0);

		startTransition(async () => {
			try {
				const result = await getOpenaiImage({
					title: petitionTitle || '',
					goal: petitionObjective || '',
					category: category,
				});

				if (result.success) {
					const response = await fetch(result.data.url);
					if (!response.ok) {
						throw new Error('Failed to fetch generated image');
					}

					const blob = await response.blob();
					const file = new File([blob], 'ai-generated-image.png', {
						type: 'image/png',
					});

					const previewImageUrl = URL.createObjectURL(file);

					setPreviewUrl(previewImageUrl);

					updateFormData({
						picture: file,
					});

					// Terminer la progression à 100%
					setProgressValue(100);
					setTimeout(() => {
						setIsGenerating(false);
						setProgressValue(0);
					}, 500);

					toast.success(
						t('aiImageGenerated') ||
							'AI image generated successfully!'
					);
				} else {
					setIsGenerating(false);
					setProgressValue(0);
					toast.error(
						t('aiImageError') ||
							'Failed to generate AI image. Please try again.'
					);
				}
			} catch (error) {
				console.error('Error generating AI image:', error);
				setIsGenerating(false);
				setProgressValue(0);
				toast.error(
					t('aiImageError') ||
						'Failed to generate AI image. Please try again.'
				);
			}
		});
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
							<div className="flex flex-col sm:flex-row gap-2">
								<Button
									type="button"
									variant="outline"
									className="flex items-center gap-2"
									disabled={isPending || isGenerating}
									onClick={(e) => {
										e.stopPropagation();
										fileInputRef.current?.click();
									}}
								>
									<Upload className="w-4 h-4" />
									{t('selectFile')}
								</Button>
								<Button
									type="button"
									variant="outline"
									className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
									onClick={handleGenerateAIImage}
									disabled={isPending || isGenerating}
								>
									{isPending ? (
										<div className="w-4 h-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
									) : (
										<Wand2 className="w-4 h-4" />
									)}
									{isPending
										? t('generating') || 'Generating...'
										: t('generateAI') || 'Generate AI'}
								</Button>
							</div>
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

			{/* Barre de progression pour la génération AI */}
			{isGenerating && (
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-purple-600 font-medium">
							{t('generating') || 'Generating AI image...'}
						</span>
						<span className="text-gray-500">
							{Math.round(progressValue)}%
						</span>
					</div>
					<Progress
						value={progressValue}
						className="h-2 bg-gray-100"
					/>
				</div>
			)}
		</div>
	);
}
