import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StackExchange } from "../utils/stackExchangeApi";

export default function useQuetion() {
	const queryClient = useQueryClient();
	const getQuestions = useQuery(
		["questions"],
		() => StackExchange.questions(),
		{
			staleTime: 1000 * 60 * 5,
		}
	);
	return { getQuestions };
}
