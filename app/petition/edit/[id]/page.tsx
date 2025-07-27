import { getCurrentUser } from '@/actions/get-current-user';
import { getPetitionToUpdate } from '@/actions/get-petition-to-update';
import { EditPetitionClient } from './edit-petition-client';

import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { EditPetitionSkeleton } from '@/components/petition/edit-petition-skeleton';

export const dynamic = 'force-dynamic';

interface EditPetitionPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditPetitionPage({
	params,
}: EditPetitionPageProps) {
	const { id } = await params;
	const currentUser = await getCurrentUser();
	const petition = await getPetitionToUpdate(id);

	if (!currentUser) {
		redirect('/');
	}

	if (!petition) {
		redirect('/');
	}

	return (
		<Suspense fallback={<EditPetitionSkeleton />}>
			<EditPetitionClient currentUser={currentUser} petition={petition} />
		</Suspense>
	);
}
