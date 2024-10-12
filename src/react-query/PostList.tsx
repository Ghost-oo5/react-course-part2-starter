import usePosts from "./Hooks/usePost";
import React from "react";

const PostList = () => {
  const pageSize=10;
  const { data, error, isLoading, fetchNextPage } = usePosts({ pageSize });

  if (error) return <p className="text-danger fw-bold">{error.message}</p>;
  if (isLoading) return <div className="spinner-border text-success"></div>;
  return (
    <>
      <ul className="list-group">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.map((post) => (
              <li key={post.id} className="list-group-item text-danger">
                {post.id} {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button className="btn btn-primary my-3" onClick={()=>fetchNextPage()}>Load more</button>
    </>
  );
};

export default PostList;
