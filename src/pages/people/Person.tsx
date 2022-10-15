import React from "react";

interface PersonProps {
	name?: string;
	hairColor?: string;
	eyeColor?: string;
}
export const Person = ({ eyeColor, hairColor, name }: PersonProps) => {
	return (
		<div>hi</div>
		// <li>
		// 	{name}
		// 	<ul>
		// 		<li>hair: {hairColor}</li>
		// 		<li>eyes: {eyeColor}</li>
		// 	</ul>
		// </li>
	);
};
