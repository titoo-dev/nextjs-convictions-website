import { useQuery } from '@tanstack/react-query';
import { getObjectiveSuggestions } from '@/lib/api';
import { ObjectiveSuggestionPayload } from '@/schemas/objective-suggestion-payload';
import { SuggestionsResponse } from '@/schemas/suggestions-response';

type UseGetObjectiveSuggestionsOptions = {
	enabled?: boolean;
};

export function useGetObjectiveSuggestions(
	payload: ObjectiveSuggestionPayload,
	options: UseGetObjectiveSuggestionsOptions = {}
) {
	const { enabled = true } = options;

	return useQuery<SuggestionsResponse, Error>({
		queryKey: ['objective-suggestions', payload],
		queryFn: () => getObjectiveSuggestions(payload),
		enabled: enabled && !!payload.inputGoal,
	});
}
