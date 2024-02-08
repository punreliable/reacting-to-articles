import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { QueryClient, QueryClientProvider } from "react-query";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const {data, isError, error, isLoading} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if(!data){ return(<div><h1>Loading...</h1></div>)}
  if(isLoading){ return(<div><h1>Loading...</h1></div>)}
  if(isError){ return(<div><h1>There has been an error</h1>
  <p>{error.toString()}</p></div>)}
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
