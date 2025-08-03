import { Suspense } from 'react';
import { CreateSurveySkeleton } from './create-survey-skeleton';
import { CreateSurvey } from './create-survey';

export const dynamic = 'force-dynamic';

export default function CreateSurveyPage() {
	return (
		<Suspense fallback={<CreateSurveySkeleton />}>
			<CreateSurvey />
		</Suspense>
	);
}
