import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useRef } from "react";
import { Person } from "./Person";

export type PersonResponseType = {
	count: number;
	next: string | null;
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

const fetchUrl = async (pageURL: string) => {
	const response = await axios.get(pageURL);
	return response.data;
};

const initialURL = "https://swapi.dev/api/people/";

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
		({ pageParam = initialURL }) => fetchUrl(pageParam),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.next || undefined;
			},
		}
	);

	const intersectionObserver = useRef<IntersectionObserver>();

	const lastPersonRef = useCallback(
		(person: any) => {
			if (isFetchingNextPage) {
				return;
			}
			if (intersectionObserver.current) {
				console.log(intersectionObserver.current);
				intersectionObserver.current.disconnect();
			}

			intersectionObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					console.log("We are near the last person!");
					fetchNextPage();
				}
			});

			if (person) {
				console.log("checing---------------");
				intersectionObserver.current?.observe(person);
			}
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
