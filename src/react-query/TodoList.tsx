import { Spinner, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";
import useTodos from "./Hooks/useTodos"

function TodoList() {
  const {data, error, isLoading} = useTodos();
  return (
    <>
   { error && <Text color={'red'} fontWeight={'bold'}>{error.message}</Text>}
   { isLoading && <Spinner color="green"></Spinner>}
    <Table>
      <Thead>
        <Tr>
          <Td>ID</Td>
          <Td>Task Name</Td>
        </Tr>
      </Thead>
      <Tbody>
      {data?.map((item)=>
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td>{item.title}</Td>
        </Tr>
        )}
      </Tbody>
    </Table>
    
    </>
  )
}

export default TodoList