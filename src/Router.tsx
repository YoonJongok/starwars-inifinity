import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InfinitePeople } from "./pages/people/InfinitePeople";
import { InfiniteSpecies } from "./pages/species/InfiniteSpecies";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<InfinitePeople />} />
				<Route path="/species" element={<InfiniteSpecies />} />
			</Routes>
		</BrowserRouter>
	);
};
