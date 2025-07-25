import { PublicPetition } from '@/schemas/petition';
import { useTranslations } from 'next-intl';
import { RenderWhen } from '../render-when';

type PetitionStatsProps = {
	petition: PublicPetition;
};

export function PetitionStats({ petition }: PetitionStatsProps) {
	const t = useTranslations('petitions.card');

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-sm text-gray-500">
					{petition.usersSignedNumber} {t('signatures')}
				</span>
				<RenderWhen condition={petition.isMine}>
					<div className="mb-2">
						<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
							Published
						</span>
					</div>
				</RenderWhen>

				<RenderWhen condition={!petition.isMine && petition.isISign}>
					<div className="mb-2">
						<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
							Signed
						</span>
					</div>
				</RenderWhen>
			</div>
		</div>
	);
}
