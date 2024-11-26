import {useCallback, useEffect, useState} from "react";

type FetchOptions = Omit<RequestInit, "signal">;

interface useFetchResult<T> {
	data: T | null;
	error: Error | null;
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
}

export const useFetch = <T,>(
	url: string,
	options: FetchOptions = {}
): useFetchResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		setIsLoading(true);
		setIsError(false);

		fetch(url, {...options, signal})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				return response.json() as Promise<T>;
			})
			.then(setData)
			.catch((err) => {
				if (err.name === "AbortError") {
					console.log("Fetch aborted");
				} else {
					setIsError(true);
					setError(err);
				}
			})
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, [url, options]);

	useEffect(() => {
		const abortFetch = fetchData();

		return () => abortFetch();
	}, []);

	return {data, error, isError, isLoading, refetch: fetchData};
};
