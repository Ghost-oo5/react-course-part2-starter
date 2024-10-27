import { Button, HStack, Input, Spinner, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo } from "./Hooks/useTodos";
import { useQueryClient } from "@tanstack/react-query";

interface TodoContext
{
  previous:Todo[],
}
function TodoForm() {
  const query = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const AddTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: (newTodo: Todo) => {
      const previousTodos = query.getQueryData<Todo[]>(['todos']) ||[];
      query.setQueryData(["todos", 10], (oldData: any) => {
        if (!oldData) return { pages: [[newTodo]], pageParams: [1] };

        // Add the new newTodo to the first page of the cache
        return {
          ...oldData,
          pages: [[newTodo, ...oldData.pages[0]], ...oldData.pages.slice(1)],
        };
      });
      if (ref.current) ref.current.value = "";

      return {previousTodos}
    },
    onSuccess: (savedTodo, newTodo) => {
      query.setQueryData<Todo[]>(["todo"], (todos) =>
        todos?.map((item) => (item == newTodo ? savedTodo : item))
      );
    },

    onError:(error, newTodo, context) =>
    {
      if(!context) return;

      query.setQueryData(['todos'], context.previousTodos)
    }
    
  });
  return (
    <>
      {AddTodo.error && <Text color={'red'} fontWeight={'bold'}>{AddTodo.error.message}</Text>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(ref.current?.value);
          if (ref.current && ref.current.value)
            AddTodo.mutate({
              userId: 1,
              id: 1,
              title: ref.current?.value,
              completed: true,
            });
        }}
      >
        <HStack marginLeft={2} marginBottom={3}>
          <Input ref={ref} placeholder="Add todo" />
          <Button disabled={AddTodo.isPending} type="submit">
            {AddTodo.isPending ? "Loading..." : "Add Task"}
          </Button>
        </HStack>
      </form>
    </>
  );
}

export default TodoForm;
