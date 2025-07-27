import { getCurrentUser } from '@/actions/get-current-user';
import { NewPetitionClient } from './petition-client';

import { Suspense } from 'react';
import { NewPetitionSkeleton } from '@/components/petition/new-petition-skeleton';

export const dynamic = 'force-dynamic';

export default async function NewPetitionPage() {
	const currentUser = await getCurrentUser();

	return (
		<Suspense fallback={<NewPetitionSkeleton />}>
			<NewPetitionClient currentUser={currentUser} />
		</Suspense>
	);
}
