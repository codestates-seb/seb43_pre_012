import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StackExchange } from "../utils/stackExchangeApi";

export default function useQuestionById(id) {
  const queryClient = useQueryClient();

  const getQuestionById = useQuery(
    ["question"],
    () => StackExchange.question(id),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  return { getQuestionById };
}
