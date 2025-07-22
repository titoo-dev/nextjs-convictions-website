import { getCurrentUser } from '@/actions/get-current-user';
import BoostPlanPage from './boost-plan-page';

type BoostPlanPageProps = {
	params: Promise<{ id: string }>;
};

export default async function BoostPlanPageServer({
	params,
}: BoostPlanPageProps) {
	const user = await getCurrentUser();
	const { id } = await params;

	return <BoostPlanPage user={user} petitionId={id} />;
}
