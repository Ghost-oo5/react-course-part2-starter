import { useState } from "react";
import usePost from "./Hooks/usePost";
import React from "react";

const PostList = () => {
  const PageSize= 10;
  // const [page, setPage] =useState(1);
  const { data, error, isLoading, fetchNextPage } = usePost({PageSize});

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <div className="spinner-border text-warning"></div>;

  return (
    <>
      
      <ul className="list-group">
        {data?.pages.map((page, index)=>
          <React.Fragment key={index}>
            {page.map((post) => (
          <li key={post.id} className="list-group-item text-success">
            {post.title}
          </li>
        ))}
          </React.Fragment>
        )}
        
      </ul>
      {/* <button
      disabled={page==1} type="button" className="btn btn-primary me-2 my-3" onClick={()=>setPage(page-1)}>Prev</button>
      <button type="button" className="btn btn-primary my-3" onClick={()=>setPage(page+1)}>Next</button> */}
      <button type="button" className="btn btn-primary my-3" onClick={()=>fetchNextPage()}>Load more</button>
    </>
  );
};

export default PostList;
