import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StackExchange } from "../utils/stackExchangeApi";

export default function useQuestion() {
  const queryClient = useQueryClient();

  const getQuestions = useQuery(
    ["questions"],
    () => StackExchange.questions(),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

	const getQuestionById = useQuery(
    ["question"],
    () => StackExchange.question(id),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

	const addQuestion= useMutation((question) => StackExchange.addItem(question), {
		onSuccess: (_, question) => {
			queryClient.invalidateQueries(["questions"]);
			queryClient.invalidateQueries(["questions", question.question_id]);
		},
	});

	const updateQuestion = useMutation((question) => StackExchange.updateItem(question), {
		onSuccess: (_, question) => {
			queryClient.invalidateQueries(["questions"]);
			queryClient.invalidateQueries(["questions", question.question_id]);
		},
	});

	const removeQuestion= useMutation((question) => StackExchange.removeItem(question), {
		onSuccess: () => {
			queryClient.invalidateQueries(["questions"]);
		},
	});

  return { getQuestions,getQuestionById,addQuestion,updateQuestion,removeQuestion };
}
