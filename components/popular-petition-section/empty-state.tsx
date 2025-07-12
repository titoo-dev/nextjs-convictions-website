import { FileText } from "lucide-react";
import { useTranslations } from 'next-intl';

export function EmptyState() {
	const t = useTranslations('petitions.emptyState');

    return (
		<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
			<div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
				<FileText className="w-12 h-12 text-gray-400" />
			</div>

			<h3 className="text-xl font-semibold text-gray-900 mb-2">
				{t('title')}
			</h3>

			<p className="text-gray-600 mb-8 max-w-md">
				{t('description')}
			</p>
		</div>
	);
}
