import { List, ListItem, Menu, MenuItem } from '@chakra-ui/react';
import useTodos from './Hooks/useTodos';


const TodoList = () => {
  const {data:todos, error, isLoading } = useTodos();
  if (isLoading) return <div className="spinner-border text-danger"></div>
  if (error) return <p className='text-danger fw-bold'>{error.message}</p>;

  return (
    <Menu>
      {todos?.map((todo) => (
        <MenuItem key={todo.id} border={'1px'} borderRadius={'5px'} marginY={2}>
          {todo.title}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TodoList;
