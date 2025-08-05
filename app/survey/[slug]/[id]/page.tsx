import { Suspense } from 'react';
import { SurveyDetailSkeleton } from './survey-detail-skeleton';
import { SurveyDetail } from './survey-detail';

export default async function SurveyPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;

	return (
		<Suspense fallback={<SurveyDetailSkeleton />}>
			<SurveyDetail id={params.id} />
		</Suspense>
	);
}
