import { useEffect, useState } from "react";
import { getPostsPage } from "../api/axios";

export const usePosts = (pageNum = 1) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<{ message?: string }>({});
	const [hasNextPage, setHasNextPage] = useState(false);
	const [results, setResults] = useState<any[]>([]);

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		setError({});
		const controller = new AbortController();
		const { signal } = controller;

		getPostsPage(pageNum, { signal })
			.then((data) => {
				setResults((prev: any[]) => [...prev, ...data]);
				setHasNextPage(Boolean(data.length));
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				if (signal.aborted) return;
				setIsError(true);
				setError({ message: e.message });
			});

		return () => controller.abort();
	}, [pageNum]);

	return {
		isLoading,
		isError,
		error,
		hasNextPage,
		results,
	};
};
