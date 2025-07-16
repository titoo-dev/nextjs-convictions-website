import { TitleSuggestionPayload } from '@/schemas/title-suggestion-payload';
import {
	SuggestionsResponse,
	SuggestionsResponseSchema,
} from '@/schemas/suggestions-response';

export async function getTitleSuggestions(
	payload: TitleSuggestionPayload
): Promise<SuggestionsResponse> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/openai/title`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}
		);

		if (response.status !== 201) {
			throw new Error(
				`Failed to fetch suggestions: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		// Validate response against schema
		const validatedData = SuggestionsResponseSchema.parse(data);

		return validatedData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				`Error fetching title suggestions: ${error.message}`
			);
		}
		throw new Error(
			'Unknown error occurred while fetching title suggestions'
		);
	}
}
