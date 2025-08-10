import { useQuery } from '@tanstack/react-query';
import { getSurveyDescriptionSuggestions } from '@/lib/api';
import { SuggestionsResponse } from '@/schemas/suggestions-response';

type SurveyDescriptionSuggestionPayload = {
	question: string;
	responseLanguage: string;
};

type UseGetSurveyDescriptionSuggestionOptions = {
	enabled?: boolean;
};

export function useGetSurveyDescriptionSuggestion(
	payload: SurveyDescriptionSuggestionPayload,
	options: UseGetSurveyDescriptionSuggestionOptions = {}
) {
	const { enabled = true } = options;

	return useQuery<SuggestionsResponse, Error>({
		queryKey: ['survey-description-suggestion', payload],
		queryFn: () => getSurveyDescriptionSuggestions(payload),
		enabled: enabled && !!payload.question && payload.question.length > 1,
	});
}
