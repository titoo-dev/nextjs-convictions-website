import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Upload, X, Wand2 } from 'lucide-react';
import { useState, useRef, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { getOpenaiSurveyImage } from '@/actions/get-openai-survey-image';
import { Progress } from '@/components/ui/progress';

type SurveyImageUploadProps = {
	question?: string;
	description?: string;
	onImageChange: (file: File | null) => void;
	previewUrl?: string | null;
};

export function SurveyImageUpload({
	question,
	description,
	onImageChange,
	previewUrl: externalPreviewUrl,
}: SurveyImageUploadProps) {
	const [dragActive, setDragActive] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		externalPreviewUrl || null
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
		onImageChange(file);
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
		onImageChange(null);
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

	const handleGenerateAISurveyImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!question || !description) {
			toast.error('Please add a title and description first');
			return;
		}

		setIsGenerating(true);
		setProgressValue(0);

		startTransition(async () => {
			try {
				const result = await getOpenaiSurveyImage({
					question: question,
					description: description,
				});

				if (result.success) {
					const response = await fetch(result.data.url);
					if (!response.ok) {
						throw new Error(
							'Failed to fetch generated survey image'
						);
					}

					const blob = await response.blob();
					const file = new File(
						[blob],
						'ai-generated-survey-image.png',
						{
							type: 'image/png',
						}
					);

					const previewImageUrl = URL.createObjectURL(file);
					setPreviewUrl(previewImageUrl);
					onImageChange(file);

					// Terminer la progression à 100%
					setProgressValue(100);
					setTimeout(() => {
						setIsGenerating(false);
						setProgressValue(0);
					}, 500);

					toast.success('AI survey image generated successfully!');
				} else {
					setIsGenerating(false);
					setProgressValue(0);
					toast.error(
						result.error ||
							'Failed to generate AI survey image. Please try again.'
					);
				}
			} catch (error) {
				console.error('Error generating AI survey image:', error);
				setIsGenerating(false);
				setProgressValue(0);
				toast.error(
					'Failed to generate AI survey image. Please try again.'
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
							? 'border-blue-400 bg-blue-50'
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
									Select Image
								</Button>
								<Button
									type="button"
									variant="outline"
									className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
									onClick={handleGenerateAISurveyImage}
									disabled={isPending || isGenerating}
								>
									{isPending ? (
										<div className="w-4 h-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
									) : (
										<Wand2 className="w-4 h-4" />
									)}
									{isPending
										? 'Generating...'
										: 'Generate AI Survey Image'}
								</Button>
							</div>
							<p className="text-sm text-gray-500">
								Drag and drop an image here, or click to select
							</p>
							<p className="text-xs text-gray-400">
								PNG, JPG, GIF up to 10MB
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
							src={previewUrl!}
							alt="Survey Image Preview"
							width={400}
							height={300}
							className="w-full h-72 object-cover"
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
						<span className="text-blue-600 font-medium">
							Generating AI image...
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
