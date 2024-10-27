import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export interface Todo {
  id: number;
  title: string;
}

function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axios
        .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.data),
  });
}
export default useTodos;
