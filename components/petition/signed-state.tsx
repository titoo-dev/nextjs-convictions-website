import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

export function SignedState() {
	const t = useTranslations('petition.signed');

	return (
		<div className="text-center py-4 transition-all duration-300 ease-in-out">
			<Badge
				variant="default"
				className="bg-green-600 animate-in fade-in-0 zoom-in-95 duration-200"
			>
				{t('badge')}
			</Badge>
			<p className="text-sm text-gray-500 mt-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-100">
				{t('thankYou')}
			</p>
		</div>
	);
}
