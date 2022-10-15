import { useCallback, useRef, useState } from "react";
import { Post } from "../../component/Post";
import { usePosts } from "../../hooks/usePost";

export const Example1 = () => {
	const [pageNum, setPageNum] = useState(1);

	const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);

	const intObserver = useRef<IntersectionObserver>();
	const lastPostRef = useCallback(
		(post: any) => {
			if (isLoading) return;
			if (intObserver.current) {
				console.log(intObserver);
				intObserver.current.disconnect();
			}
			intObserver.current = new IntersectionObserver((posts) => {
				if (posts[0].isIntersecting && hasNextPage) {
					console.log("We are near the last post!");
					setPageNum((prev) => prev + 1);
				}
			});
			if (post) intObserver.current.observe(post);
		},
		[isLoading, hasNextPage]
	);

	if (isError) return <p>Error: {error.message}</p>;

	const content = results.map((post, i) => {
		if (results.length === i + 1) {
			return <Post ref={lastPostRef} key={post.id} post={post} />;
		}
		return <Post key={post.id} post={post} />;
	});

	return (
		<>
			<h1 id="top">
				Infinity Query Scroll <br />
				Ex. 1 = React only
			</h1>
			{content}
			{isLoading && <p>Loading More Posts...</p>}
			<p>
				<a href="#top">Back to top</a>
			</p>
		</>
	);
};
