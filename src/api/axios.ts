import axios from "axios";

export type PostResponse = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export const api = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPostsPage = async (pageParam = 1, options = {}) => {
	const response = await api.get<PostResponse[]>(
		`/posts?_page=${pageParam}`,
		options
	);
	return response.data;
};
