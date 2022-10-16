import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Example2 } from "./pages/Example/Example2";
import { InfinitePeople } from "./pages/People/InfinitePeople";
import { InfiniteSpecies } from "./pages/Species/InfiniteSpecies";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<InfinitePeople />} />
				<Route path="/example" element={<Example2 />} />
				<Route path="/species" element={<InfiniteSpecies />} />
			</Routes>
		</BrowserRouter>
	);
};
