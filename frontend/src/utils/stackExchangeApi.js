import axios from "axios";

const httpClient = axios.create({
	baseURL: "https://api.stackexchange.com/2.3/",
});

export const StackExchange = {
	async users(sort = "reputation") {
		return httpClient
			.get("users", {
				params: {
					site: "stackoverflow",
					order: "desc",
					sort,
				},
			})
			.then((json) => json.data.items);
	},
};
