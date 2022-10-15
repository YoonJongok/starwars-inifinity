import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url: string) => {
	const response = await fetch(url);
	return response.json();
};

export function InfiniteSpecies() {
	// TODO: get data for InfiniteScroll via React Query
	// return <InfiniteScroll />;
	return <div>Infinish species</div>;
}