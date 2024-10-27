import { Button, HStack, Input, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./Hooks/useTodos";
import { useRef } from "react";

interface addTodoContext {
  previousTodos: Todo[];
}

function TodoForm() {
  const query = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useMutation<Todo, Error, Todo, addTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: (newTodo: Todo) => {
      const previousTodos = query.getQueryData<Todo[]>(["todos"]) || [];
      query.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      ref.current?.value ? (ref.current.value = "") : undefined;
      return { previousTodos };
    },
    onSuccess: (savedTodo, newtodo) => {
      query.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newtodo ? savedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;
      query.setQueryData(["todos"], context?.previousTodos);
    },
  });

  return (
    <>
    {addTodo.error && <Text color={'red'} fontWeight={'bold'}>{addTodo.error.message}</Text>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 1,
              title: ref.current?.value,
            });
        }}
      >
        <HStack marginBottom={5}>
          <Input ref={ref} type="text" placeholder="Add Todo" />
          <Button disabled={addTodo.isPending} type="submit">
            {addTodo.isPending ? "Loading..." : "Add Task"}
          </Button>
        </HStack>
      </form>
    </>
  );
}

export default TodoForm;
