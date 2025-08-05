import { Suspense } from 'react';
import { TakeSurveySkeleton } from './take-survey-skeleton';
import { TakeSurvey } from './take-survey';

export default async function SurveyTakePage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;

	return (
		<Suspense fallback={<TakeSurveySkeleton />}>
			<TakeSurvey id={params.id} />
		</Suspense>
	);
}
