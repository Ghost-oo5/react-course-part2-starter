import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoPages
{
  // page:number,
  pageSize:number,
}
function useTodos({pageSize}:TodoPages) {
  return useInfiniteQuery<Todo[]>({
    queryKey: ["todos", pageSize],
    queryFn: ({pageParam=1}) =>
      axios
        .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
          params:{
            _start:(pageParam-1)* pageSize,
            _limit: pageSize,
          }
        })
        .then((res) => res.data),
        initialPageParam:1,
        getNextPageParam:(lastPage, allPages)=>
        {
          return (lastPage.length >0) ? allPages.length+1: undefined
        }
  });
}

export default useTodos;
