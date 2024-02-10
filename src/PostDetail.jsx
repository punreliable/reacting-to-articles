import { fetchComments } from "./api";
import { useQuery } from '@tanstack/react-query';
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(post.id),
  });

if( isLoading ) {
  return(
  <div>
    <h1>...is Loading</h1>
  </div>
  )
}

if( isError ) {
  return(
    <div>
      <h1>Error</h1>
      <p>{error.toString()}</p>
    </div>
  ) 
}

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post (was not) deleted successfully</p>
        )}
        <button onClick={() => {}}>Update title</button>
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
