import { useTranslations } from 'next-intl';

type MediaTypeSelectorProps = {
	selectedType: 'PICTURE' | 'VIDEO_YOUTUBE';
	onTypeChange: (type: 'PICTURE' | 'VIDEO_YOUTUBE') => void;
};

export function MediaTypeSelector({ selectedType, onTypeChange }: MediaTypeSelectorProps) {
	const t = useTranslations('petition.form.mediaStep');
	
	return (
		<div className="space-y-4">
			<p className="text-sm font-medium text-gray-700">{t('mediaType')}</p>
			<div className="space-y-3">
				<label className="flex items-center space-x-3 cursor-pointer group">
					<input
						type="radio"
						name="mediaType"
						value="PICTURE"
						checked={selectedType === 'PICTURE'}
						onChange={() => onTypeChange('PICTURE')}
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
						checked={selectedType === 'VIDEO_YOUTUBE'}
						onChange={() => onTypeChange('VIDEO_YOUTUBE')}
						className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
					/>
					<span className="text-gray-900 group-hover:text-gray-700 transition-colors">
						{t('videoYoutube')}
					</span>
				</label>
			</div>
		</div>
	);
}
