import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

export type PersonResponseType = {
	count: number;
	next: string;
	previous: string | null;
	results: {
		name: string;
		height: string;
		mass: string;
		hair_color: string;
		skin_color: string;
		eye_color: string;
		birth_year: string;
		gender: string;
		homeworld: string;
		films: string[];
		species: string[];
		vehicles: string[];
		starships: string[];
		created: string;
		edited: string;
		url: string;
	}[];
};
const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url: string) => {
	const response = await fetch(url);
	return response.json();
};

export function InfinitePeople() {
	const { data, fetchNextPage, hasNextPage, isLoading } =
		useInfiniteQuery<PersonResponseType>(
			["sw-people"],
			({ pageParam = initialUrl }) => fetchUrl(pageParam),
			{
				getNextPageParam: (lastPage) => lastPage.next || undefined,
			}
		);
	// TODO: get data for InfiniteScroll via React Query
	// return <InfiniteScroll />;
	return <div>infinite will implemented here :</div>;
}
