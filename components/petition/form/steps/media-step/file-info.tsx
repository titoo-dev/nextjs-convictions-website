import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

type FileInfoProps = {
	file?: File | null;
	videoId?: string;
	onRemove: () => void;
	type?: 'image' | 'video';
};

export function FileInfo({ file, videoId, onRemove, type = 'image' }: FileInfoProps) {
	const t = useTranslations('petition.form.mediaStep');
	
	return (
		<div className="flex items-center justify-between">
			<div className="text-xs text-gray-500">
				{type === 'image' && file && (
					<>
						<span>{t('fileInfo.file')}: {file.name}</span>
						<span className="ml-4">
							{t('fileInfo.size')}: {(file.size / 1024 / 1024).toFixed(2)} MB
						</span>
					</>
				)}
				{type === 'video' && videoId && (
					<span>{t('fileInfo.videoId')}: {videoId}</span>
				)}
			</div>
			<Button
				type="button"
				variant="outline"
				size="sm"
				className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
				onClick={onRemove}
			>
				<X className="w-3 h-3" />
				{type === 'image' ? t('removeImage') : t('removeVideo')}
			</Button>
		</div>
	);
}
