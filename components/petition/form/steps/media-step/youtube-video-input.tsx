import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { validateYouTubeUrl } from '@/lib/utils';
import { ValidationIcon } from './validation-icon';
import { FileInfo } from './file-info';

type YouTubeVideoInputProps = {
	videoUrl?: string;
	onUrlChange: (url: string) => void;
};

export function YouTubeVideoInput({ videoUrl, onUrlChange }: YouTubeVideoInputProps) {
	const t = useTranslations('petition.form.mediaStep');
	const [youtubeValidation, setYoutubeValidation] = useState<{
		isValid: boolean;
		error?: string;
		videoId?: string;
	} | null>(null);

	// Validate YouTube URL when it changes
	useEffect(() => {
		if (videoUrl?.trim()) {
			const validation = validateYouTubeUrl(videoUrl.trim());
			setYoutubeValidation(validation);
		} else {
			setYoutubeValidation(null);
		}
	}, [videoUrl]);

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<label className="text-sm font-medium text-gray-700">
					{t('youtubeUrl')}
				</label>
				<div className="relative">
					<Input
						placeholder={t('youtubeUrlPlaceholder')}
						value={videoUrl || ''}
						onChange={(e) => onUrlChange(e.target.value)}
						className={`pr-10 ${
							youtubeValidation && !youtubeValidation.isValid
								? 'border-red-300 focus:border-red-500 focus:ring-red-500'
								: youtubeValidation && youtubeValidation.isValid
								? 'border-green-300 focus:border-green-500 focus:ring-green-500'
								: ''
						}`}
					/>
					<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<ValidationIcon validation={youtubeValidation} />
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
			{youtubeValidation?.isValid && youtubeValidation.videoId && (
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
					<FileInfo 
						videoId={youtubeValidation.videoId}
						onRemove={() => onUrlChange('')}
						type="video"
					/>
				</div>
			)}
		</div>
	);
}
