import { getSurvey } from '@/actions/get-survey';
import { getCurrentUser } from '@/actions/get-current-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { TakeSurveyClient } from './take-survey-client';

export async function TakeSurvey({ id }: { id: string }) {
	const [survey, currentUser] = await Promise.all([
		getSurvey(id),
		getCurrentUser(),
	]);

	if (!survey) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center px-4">
				<Card className="max-w-md w-full border-0 shadow-none">
					<CardContent className="text-center py-8">
						<div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
							<BarChart3 className="w-6 h-6 text-muted-foreground" />
						</div>
						<h2 className="text-lg font-bold text-foreground mb-2">
							Survey Not Found
						</h2>
						<p className="text-muted-foreground mb-6 text-sm">
							The survey you&apos;re looking for doesn&apos;t
							exist or has been removed.
						</p>
						<Link href="/surveys">
							<Button size="sm" className="gap-2">
								<ArrowLeft className="w-3 h-3" />
								Back to Surveys
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	return <TakeSurveyClient survey={survey} currentUser={currentUser} />;
}
