import { useQuery, useQueryClient } from "react-query";
import { StackExchange } from "../utils/stackExchangeApi";
import { getCookie } from "../utils/cookies";
const buffer = require("buffer").Buffer;

export default function useUserInfo() {
  const queryClient = useQueryClient();
  const getUsers = useQuery(["users"], () => StackExchange.users(), {
    staleTime: 1000 * 60 * 5,
  });
  return { getUsers };
}

export const getMemberId = () => {
  const authorization = getCookie("token").slice(7);

  const decoded = buffer.from(authorization, "base64").toString("utf-8");

  const memberId = Number(
    decoded.slice(decoded.indexOf("memberId") + 10, decoded.indexOf("sub") - 2)
  );

  return memberId;
};
