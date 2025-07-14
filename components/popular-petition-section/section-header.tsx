import { useTranslations } from 'next-intl';

export function SectionHeader() {
	const t = useTranslations('petitions.popularSection');

	return (
		<div className="text-center mb-12">
			<h2 className="text-3xl font-bold text-gray-900 mb-4">
				{t('title')}
			</h2>
			<p className="text-lg text-gray-600 max-w-2xl mx-auto">
				{t('description')}
			</p>
		</div>
	);
}
