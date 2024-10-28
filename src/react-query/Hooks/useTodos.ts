import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../Constants";
import todoService from "../../Services/todoService";



function useTodos() {
  return useQuery({
    queryKey: CACHE_KEY_TODOS, 
    queryFn: todoService.getAll,
  });
}
export default useTodos;
