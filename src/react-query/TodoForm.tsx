import { Button, HStack, Input, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./Hooks/useTodos";
import { useRef } from "react";
import useAddTodo from "./Hooks/useAddTodo";



function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);
  ref.current?.value ? (ref.current.value = "") : undefined;
const addTodo = useAddTodo(()=>{
  ref.current?.value ? (ref.current.value = "") : undefined;
})
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
