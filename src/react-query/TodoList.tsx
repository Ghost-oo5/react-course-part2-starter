import useTodos from './Hooks/useTodos';


const TodoList = () => {
  const {data:todos, error, isLoading } = useTodos();
  if (isLoading) return <div className="spinner-border text-danger"></div>
  if (error) return <p className='text-danger fw-bold'>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
