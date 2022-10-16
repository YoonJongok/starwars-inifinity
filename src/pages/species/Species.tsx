import React from "react";

interface SpeciesProps {
	name: string;
	language: string;
	averageLifespan: string;
}
export const Species = React.forwardRef<HTMLDivElement, SpeciesProps>(
	({ name, language, averageLifespan }: SpeciesProps, ref) => {
		const contentBody = (
			<>
				{name}
				<ul>
					<li>language: {language}</li>
					<li>average lifespan: {averageLifespan}</li>
				</ul>
			</>
		);
		const content = ref ? (
			<div style={{ height: "150px" }} ref={ref}>
				{contentBody}
			</div>
		) : (
			<div style={{ height: "150px" }}>{contentBody}</div>
		);

		return content;
	}
);
