import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./Hooks/useTodos";
import axios from "axios";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, HStack, Input, useToast } from "@chakra-ui/react";

const TodoForm = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const AddTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.data),
        onSuccess:(todo, newtodo)=>
        {
          console.log(newtodo);
          queryClient.setQueryData<Todo[]>(['todos'], todo=>[ newtodo, ...(todo || [])])
        }
  });
  return (
    <>
    {AddTodo.error?.message &&  toast({
          title: ref.current?.value,
          description: `${ref.current?.value} has been added`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })}
    <form
      className="row mb-3"
      onSubmit={(event) => {
        event.preventDefault();
        if(ref.current && ref.current.value)
        AddTodo.mutate({
          id: 0,
          title: ref.current?.value,
          userId: 1,
          completed: true,
        });
    {AddTodo.data &&    toast({
          title: ref.current?.value,
          description: `${ref.current?.value} has been added`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })}
      }}
    >
      <HStack>
        <Input ref={ref} type="text"/>
        <Button type="submit">Add</Button>
      </HStack>
    </form>
    </>
  );
};

export default TodoForm;
