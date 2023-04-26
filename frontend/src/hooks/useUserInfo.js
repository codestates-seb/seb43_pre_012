import { useQuery, useQueryClient } from "react-query";
import { StackExchange } from "../utils/stackExchangeApi";

export default function useUserInfo() {
	const queryClient = useQueryClient();
	const getUsers = useQuery(["users"], () => StackExchange.users(), {
		staleTime: 1000 * 60 * 5,
	});
	return { getUsers };
}
