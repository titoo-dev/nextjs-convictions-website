'use server';

import { Survey, SurveySchema } from '../schemas/survey';
import { getAccessToken } from '../lib/cookies-storage';
import { z } from 'zod';

const SurveysArraySchema = z.array(SurveySchema);

export async function getSurveys(): Promise<Survey[]> {
	try {
		const accessToken = await getAccessToken();

		const endpoint = accessToken
			? `${process.env.NEXT_PUBLIC_API_BASE_URL}/survey/all`
			: `${process.env.NEXT_PUBLIC_API_BASE_URL}/survey/all/public`;

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
			console.error('Failed to fetch surveys:', response.statusText);
			return [];
		}

		const data = await response.json();

		const parsedSurveys = SurveysArraySchema.parse(data);

		return parsedSurveys;
	} catch (error) {
		console.error('Error fetching surveys:', error);
		return [];
	}
}
