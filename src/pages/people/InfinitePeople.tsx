import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
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
const fetchUrl = async (pageParam: number) => {
	console.log("page param is: ", pageParam);
	const response = await fetch(
		`https://swapi.dev/api/people/?page=${pageParam}`
	);
	return response.json();
};

export function InfinitePeople() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		error,
	} = useInfiniteQuery<PersonResponseType>(
		["sw-people"],
		({ pageParam = 1 }) => fetchUrl(pageParam),
		{
			getNextPageParam: (lastPage, allPages) => {
				console.log("lastPage", lastPage);
				console.log("last num: ", allPages[0].next.slice(-1));
				return lastPage.next !== null
					? Number(allPages[0].next.slice(-1))
					: undefined;
			},
		}
	);

	// useEffect(() => {
	// 	console.log("status: ", status);
	// 	console.log("hasNextPage: ", hasNextPage);
	// 	console.log("isFetchingNextPage: ", isFetchingNextPage);
	// }, [status, hasNextPage, isFetchingNextPage]);

	const intersectionObserver = useRef<IntersectionObserver>();

	const lastPersonRef = useCallback(
		(person: HTMLDivElement) => {
			console.log("person", person);
			if (isFetchingNextPage) {
				console.log("It is fetching next page");
				return;
			}
			console.log("intersectionObserver: ", intersectionObserver);
			if (intersectionObserver.current) {
				console.log("Disconnect current observer");
				intersectionObserver.current.disconnect();
			}

			intersectionObserver.current = new IntersectionObserver((entries) => {
				console.log("entries: ", entries);
				console.log("hasNextPage: ", hasNextPage);
				if (entries[0].isIntersecting && hasNextPage) {
					console.log("Fetch next page:\n");
					fetchNextPage();
				}

				if (person) intersectionObserver.current?.observe(person);
			});
		},
		[fetchNextPage, isFetchingNextPage, hasNextPage]
	);

	if (status === "error") {
		if (error) {
			return <>Error: {error}</>;
		}
	}

	const content = data?.pages.map((page) => {
		return page.results.map((person, i) => {
			if (page.results.length === i + 1) {
				console.log(" it is hit here.");
				return (
					<Person
						key={person.name}
						ref={lastPersonRef}
						name={person.name}
						hairColor={person.hair_color}
						eyeColor={person.eye_color}
					/>
				);
			}
			return (
				<Person
					key={person.name}
					name={person.name}
					hairColor={person.hair_color}
					eyeColor={person.eye_color}
				/>
			);
		});
	});

	return (
		<>
			<h1 id="top">
				Infinity Query Scroll <br />
				Ex. 1 = React only
			</h1>
			{content}
			{isFetchingNextPage && <p>Loading More Posts...</p>}
			<p>
				<a href="#top">Back to top</a>
			</p>
		</>
	);
}
