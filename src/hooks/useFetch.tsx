import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseFetchProps {
	query: string;
	page: string;
	url: string;
}
export const useFectch = ({ query, page, url }: UseFetchProps) => {
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(false);
	// const [list, setList] = useState([]);

	// const sendQuery = useCallback(async () => {
	// 	try {
	// 		await setLoading(true);
	// 		await setError(false);
	// 		const res = await axios.get(url);
	// 		await setList((prev) => [
	// 			...new Set([...prev, ...res.data.docs.map((d) => d.title)]),
	// 		]);
	// 		setLoading(false);
	// 	} catch (err: any) {
	// 		setError(err);
	// 	}
	// }, [query, page]);

	// useEffect(() => {
	// 	sendQuery();
	// }, [query, sendQuery, page]);

	// return { loading, error, list };
	return <div>hi</div>;
};
