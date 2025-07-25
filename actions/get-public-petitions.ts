'use server';

import { getLocale } from 'next-intl/server';
import { PublicPetition, PetitionSchema } from '../schemas/petition';
import { getAccessToken } from '@/lib/cookies-storage';

export type GetPetitionsResponse = {
	petitions: PublicPetition[];
};

export type GetPetitionsParams = {
	filter: FilteredPetitionParams;
};

export type FilteredPetitionParams = {
	page?: number;
	category?: string | 'ALL';
	query?: string;
};

export async function getPetitions(
	params: GetPetitionsParams
): Promise<GetPetitionsResponse> {
	try {
		const accessToken = await getAccessToken();

		const locale = (await getLocale()).toUpperCase();

		const { page = 1, category = 'ALL', query = '' } = params.filter;

		let url = accessToken
			? `${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/home/${locale}/${category}`
			: `${process.env.NEXT_PUBLIC_API_BASE_URL}/petition/public/home/${locale}/${category}`;

		if (query !== '') {
			const searchParams = new URLSearchParams();

			searchParams.append('languageOrigin', locale);

			searchParams.append('page', page.toString());

			if (category) {
				searchParams.append('category', category);
			}

			searchParams.append('query', query);

			url = `${
				process.env.NEXT_PUBLIC_API_BASE_URL
			}/petition/public/paginate?${searchParams.toString()}`;
		}

		// Make API request
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			cache: 'no-store',
		});

		const data = await response.json();

		const parsedPetitions = PetitionSchema.array().parse(data);

		return { petitions: parsedPetitions };
	} catch (error) {
		console.error('Error fetching public petitions:', error);

		// Return empty result on error to prevent UI crashes
		return {
			petitions: [],
		};
	}
}
