import axios from "axios";

const httpClient = axios.create({
	baseURL: "https://api.stackexchange.com/2.3/",
});
const isLocal = true;

export const StackExchange = {
	async users(sort = "reputation") {
		if (!isLocal) {
			return httpClient
				.get("users", {
					params: {
						site: "stackoverflow",
						order: "desc",
						sort,
					},
				})
				.then((json) => json.data.items);
		} else {
			console.log("local data..");
			return await axios
				.get("/datas/users.json")
				.then((json) => json.data.items);
		}
	},
	async tags(sort = "popular") {
		if (!isLocal) {
			return httpClient
				.get("tags", {
					params: {
						site: "stackoverflow",
						order: "desc",
						sort,
					},
				})
				.then((json) => json.data.items);
		} else {
			return await axios
				.get("/datas/tags.json")
				.then((json) => json.data.items);
		}
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
