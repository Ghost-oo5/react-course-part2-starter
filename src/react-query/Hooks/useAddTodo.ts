import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Todo } from './useTodos';
import { CACHE_KEY_TODOS } from '../Constants';
import APIClient from '../../Services/api-client';

const apiClient = new APIClient<Todo>('/todos')

interface addTodoContext {
    previousTodos: Todo[];
  }

function useAddTodo(onAdd:()=>void) {
    const query = useQueryClient();

    return useMutation<Todo, Error, Todo, addTodoContext>({
        mutationFn: apiClient.postAll,
        onMutate: (newTodo: Todo) => {
          const previousTodos = query.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
          query.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos=[]) => [
            newTodo,
            ...todos,
          ]);
         onAdd();
          return { previousTodos };
        },
        onSuccess: (savedTodo, newtodo) => {
          query.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
            todos?.map((todo) => (todo === newtodo ? savedTodo : todo))
          );
        },
        onError: (error, newTodo, context) => {
          if (!context) return;
          query.setQueryData(CACHE_KEY_TODOS, context?.previousTodos);
        },
      });
}

export default useAddTodo