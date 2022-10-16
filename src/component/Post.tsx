import React from "react";
import { PostResponse as GetPostType } from "../api/axios";

export type PostType = {
	post: GetPostType;
};

export const Post = React.forwardRef<HTMLElement, PostType>(({ post }, ref) => {
	const postBody = (
		<>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<p>Post ID:{post.id}</p>
		</>
	);

	const content = ref ? (
		<article ref={ref}>{postBody}</article>
	) : (
		<article>{postBody}</article>
	);
	return content;
});
