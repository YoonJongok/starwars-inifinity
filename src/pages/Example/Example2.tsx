import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { getPostsPage } from "../../api/axios";
import { Post } from "../../component/Post";

export const Example2 = () => {
	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		data,
		status,
		error,
	} = useInfiniteQuery(
		["posts"],
		({ pageParam = 1 }) => getPostsPage(pageParam),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.length ? allPages.length + 1 : undefined;
			},
		}
	);

	const intObserver = useRef<IntersectionObserver>();
	const lastPostRef = useCallback(
		(post: any) => {
			if (isFetchingNextPage) return;
			if (intObserver.current) {
				console.log(intObserver);
				intObserver.current.disconnect();
			}
			intObserver.current = new IntersectionObserver((posts) => {
				if (posts[0].isIntersecting && hasNextPage) {
					console.log("We are near the last post!");
					fetchNextPage();
				}
			});
			if (post) intObserver.current.observe(post);
		},
		[isFetchingNextPage, fetchNextPage, hasNextPage]
	);

	if (status === "error") {
		if (error) {
			return <>Error: {error}</>;
		}
	}

	const content = data?.pages.map((page) => {
		return page.map((post, i) => {
			if (page.length === i + 1) {
				return <Post ref={lastPostRef} key={post.id} post={post} />;
			}
			return <Post key={post.id} post={post} />;
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
};
