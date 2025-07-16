import { useQuery } from '@tanstack/react-query';
import { getTitleSuggestions } from '@/lib/api';
import { TitleSuggestionPayload } from '@/schemas/title-suggestion-payload';
import { SuggestionsResponse } from '@/schemas/suggestions-response';

type UseGetTitleSuggestionsOptions = {
	enabled?: boolean;
};

export function useGetTitleSuggestions(
	payload: TitleSuggestionPayload,
	options: UseGetTitleSuggestionsOptions = {}
) {
	const { enabled = true } = options;

	return useQuery<SuggestionsResponse, Error>({
		queryKey: ['title-suggestions', payload],
		queryFn: () => getTitleSuggestions(payload),
		enabled: enabled && !!payload.inputTitle,
	});
}
