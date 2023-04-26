import { useQuery, useMutation, useQueryClient } from "react-query";
import { StackExchange } from "../utils/stackExchangeApi";

let administratorAuthorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwidXNlcm5hbWUiOiJqbUBlbWFpbC5jb20iLCJzdWIiOiJqbUBlbWFpbC5jb20iLCJpYXQiOjE2ODI0NzU3NTgsImV4cCI6MTY4MjQ3NzU1OH0.qkCjPvAPkrpFjlGtFcqtd47xkZBhpuGq7fLr7wU3RJ8";
let headers = {
  Authorization: administratorAuthorization,
};

export default function useQuestion(id) {
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

  const addQuestion = useMutation(
    (question) => StackExchange.addItem(question),
    {
      onSuccess: (_, question) => {
        queryClient.invalidateQueries(["questions"]);
        queryClient.invalidateQueries(["questions", question.question_id]);
      },
    }
  );

  const updateQuestion = useMutation(
    (question) => StackExchange.updateItem(question),
    {
      onSuccess: (_, question) => {
        queryClient.invalidateQueries(["questions"]);
        queryClient.invalidateQueries(["questions", question.question_id]);
      },
    }
  );

  const removeQuestion = useMutation(
    (question) => StackExchange.removeItem(question),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questions"]);
      },
    }
  );

  return {
    getQuestions,
    getQuestionById,
    addQuestion,
    updateQuestion,
    removeQuestion,
  };
}
