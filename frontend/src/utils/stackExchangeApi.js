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
	async tags(sort = "popular") {
		return httpClient
			.get("tags", {
				params: {
					site: "stackoverflow",
					order: "desc",
					sort,
				},
			})
			.then((json) => json.data.items);
	},

	async tagWiki(tag) {
		return httpClient
			.get(`tags/${tag}/wikis`, {
				params: {
					site: "stackoverflow",
				},
			})
			.then((json) => json.data.items[0].excerpt);
	},
};

//https://api.stackexchange.com/2.3/tags/python/wikis?site=stackoverflow
