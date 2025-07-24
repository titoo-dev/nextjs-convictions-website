import { getCurrentUser } from '@/actions/get-current-user';
import { NewPetitionClient } from './petition-client';

export default async function NewPetitionPage() {
	const currentUser = await getCurrentUser();

	return <NewPetitionClient currentUser={currentUser} />;
}
