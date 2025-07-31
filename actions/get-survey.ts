'use server';

import { Survey, SurveySchema } from '../schemas/survey';
import { getAccessToken } from '../lib/cookies-storage';

export async function getSurvey(surveyId: string): Promise<Survey | null> {
	try {
		const accessToken = await getAccessToken();

		const endpoint = accessToken
			? `${process.env.NEXT_PUBLIC_API_BASE_URL}/survey/${surveyId}`
			: `${process.env.NEXT_PUBLIC_API_BASE_URL}/survey/public/${surveyId}`;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};

		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		const response = await fetch(endpoint, {
			method: 'GET',
			headers,
		});

		if (response.status !== 200) {
			console.error('Failed to fetch survey:', response.statusText);
			return null;
		}

		const data = await response.json();

		console.log(data);

		const parsedSurvey = SurveySchema.parse(data);

		return parsedSurvey;
	} catch (error) {
		console.error('Error fetching survey:', error);
		return null;
	}
}
