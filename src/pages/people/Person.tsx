import React from "react";

interface PersonProps {
	name: string;
	hairColor: string;
	eyeColor: string;
}
export const Person = React.forwardRef<HTMLDivElement, PersonProps>(
	({ eyeColor, hairColor, name }: PersonProps, ref) => {
		const personBody = (
			<>
				{name}
				<ul>
					<li>hair: {hairColor}</li>
					<li>eyes: {eyeColor}</li>
				</ul>
			</>
		);

		const content = ref ? (
			<div ref={ref}>{personBody}</div>
		) : (
			<div>{personBody}</div>
		);

		return content;
	}
);
