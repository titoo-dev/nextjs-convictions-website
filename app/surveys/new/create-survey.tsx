import { getCurrentUser } from '@/actions/get-current-user';
import { CreateSurveyClient } from './create-survey-client';

export async function CreateSurvey() {
	const currentUser = await getCurrentUser();

	return <CreateSurveyClient currentUser={currentUser} />;
}
