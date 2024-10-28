import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { CACHE_KEY_TODOS } from "../Constants";
import APIClient from "../../Services/api-client";

const apiClient = new APIClient('/todos')

export interface Todo {
  id: number;
  title: string;
}

function useTodos() {
  return useQuery({
    queryKey: CACHE_KEY_TODOS, 
    queryFn: apiClient.getAll,
  });
}
export default useTodos;
