import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./Hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
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
      }}
    >
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
