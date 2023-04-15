import axios from "axios";

const httpClient = axios.create({
	baseURL: "https://api.stackexchange.com/2.3/",
});

export const StackExchange = {
	async users() {
		return httpClient
			.get("users", {
				params: {
					site: "stackoverflow",
					order: "desc",
					sort: "reputation",
				},
			})
			.then((json) => json.data.items);
	},
};
