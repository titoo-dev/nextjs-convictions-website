import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

type PetitionStatsProps = {
	signaturesCount: number;
};

export function PetitionStats({
	signaturesCount,
}: PetitionStatsProps) {
	const t = useTranslations('petitions.card');

	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-gray-500">
				{signaturesCount} {t('signatures')}
			</span>
			<Button
				size="sm"
				className="bg-orange-500 hover:bg-orange-600"
				asChild
			>
				{t('signButton')}
			</Button>
		</div>
	);
}
