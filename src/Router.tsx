import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Example1 } from "./pages/people/Emaple";
import { Example2 } from "./pages/people/Example2";
import { InfinitePeople } from "./pages/people/InfinitePeople";
import { InfiniteSpecies } from "./pages/species/InfiniteSpecies";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<InfinitePeople />} />
				<Route path="/example" element={<Example2 />} />
				{/* <Route path="/" element={<Example1 />} /> */}
				<Route path="/species" element={<InfiniteSpecies />} />
			</Routes>
		</BrowserRouter>
	);
};
