import { PetitionHero } from '@/components/petition/petition-hero';
import { PetitionAuthor } from '@/components/petition/petition-author';
import { PetitionDetails } from '@/components/petition/petition-details';
import { PetitionContent } from '@/components/petition/petition-content';
import { PetitionComments } from '@/components/petition/petition-comments';
import { SignatureCounter } from '@/components/petition/signature-counter';
import { SignForm } from '@/components/petition/sign-form';
import { ShareSection } from '@/components/petition/share-section';
import { OwnerEmptyClient } from '@/components/petition/owner-empty-client';
import { MobileActionCard } from '@/components/petition/mobile-action-card';
import { getUniquePublicPetition } from '@/actions/get-unique-public-petition';
import RenderWhen from '@/components/render-when';
import { getLocale, getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/actions/get-current-user';

export default async function PetitionPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const locale = await getLocale();
	const t = await getTranslations('petition.page');
	const currentUser = await getCurrentUser();

	const { petition } = await getUniquePublicPetition({
		id: params.id,
		language: locale.toUpperCase() as 'FR' | 'EN' | 'ES',
	});

	if (!petition) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-2">
						{t('notFound.title')}
					</h1>
					<p className="text-gray-600">{t('notFound.description')}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-3 sm:space-y-4">
						<PetitionHero petition={petition} />
						<PetitionAuthor petition={petition} />
						<RenderWhen condition={petition.isMine === false}>
							<div className="block lg:hidden">
								<MobileActionCard
									petition={petition}
									currentUser={currentUser}
								/>
							</div>
						</RenderWhen>
						<PetitionDetails petition={petition} />
						{/* Show ShareSection below PetitionDetails on mobile, hide on lg+ */}
						<div className="block lg:hidden">
							<ShareSection petition={petition} />
						</div>
						<PetitionContent
							petition={petition}
							currentUser={currentUser}
						/>
						<PetitionComments
							currentUser={currentUser}
							petition={petition}
						/>
					</div>

					{/* Sidebar */}
					<div className="sticky top-14 space-y-4 sm:space-y-6 h-fit">
						<RenderWhen condition={petition.usersSignedNumber > 0}>
							<SignatureCounter petition={petition} />
						</RenderWhen>
						<RenderWhen condition={petition.isMine === false}>
							<SignForm
								currentUser={currentUser}
								petition={petition}
							/>
						</RenderWhen>
						{/* Show ShareSection only on lg+ screens in sidebar */}
						<div className="hidden lg:block">
							<ShareSection petition={petition} />
						</div>
					</div>
				</div>
			</div>

			<OwnerEmptyClient
				petitionId={petition.id}
				isOwner={petition.isMine}
				signatureCount={petition.usersSignedNumber}
			/>
		</div>
	);
}
