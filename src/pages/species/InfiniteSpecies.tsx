import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { Species } from "./Species";

export type SpeciesResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: {
		name: string;
		classification: string;
		designation: string;
		average_height: string;
		skin_colors: string;
		hair_colors: string;
		eye_colors: string;
		average_lifespan: string;
		homeworld: string;
		language: string;
		people: string[];
		films: string[];
		created: string;
		edited: string;
		url: string;
	}[];
};

const initialUrl = "https://swapi.dev/api/species/";

const fetchSpecies = async (url: string) => {
	const response = await axios.get<SpeciesResponse>(url);
	return response.data;
};

export function InfiniteSpecies() {
	const {
		data,
		isLoading,
		status,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery(
		["sw-species"],
		({ pageParam = initialUrl }) => fetchSpecies(pageParam),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.next || null;
			},
		}
	);

	useEffect(() => {
		if (!isLoading && status === "success") {
			console.log("data:\n", data.pages[0]);
		}
	}, [isLoading, status, data]);

	if (status === "error") {
		if (error) {
			return <>Error: {error}</>;
		}
	}
	const intersectionObserver = useRef<IntersectionObserver>();

	const lastElRef = useCallback(
		(species: any) => {
			if (isFetchingNextPage) return;

			if (intersectionObserver.current) {
				intersectionObserver.current.disconnect();
			}

			intersectionObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});

			if (species) {
				intersectionObserver.current.observe(species);
			}
		},
		[isFetchingNextPage, hasNextPage, fetchNextPage]
	);

	const content = data?.pages.map((page) => {
		return page.results.map((s, i) => {
			if (page.results.length === i + 1) {
				return (
					<Species
						key={s.name}
						ref={lastElRef}
						name={s.name}
						averageLifespan={s.average_lifespan}
						language={s.language}
					/>
				);
			}
			return (
				<Species
					key={s.name}
					name={s.name}
					averageLifespan={s.average_lifespan}
					language={s.language}
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
