import {
  Button,
  HStack,
  Menu,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useTodos from "./Hooks/useTodos";
import { Fragment } from "react";

function TodoList() {
  const pageSize = 10;
  // const [page, setPage] = useState(1);
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    useTodos({ pageSize });
  return (
    <>
      {isLoading && <Spinner color="red"></Spinner>}
      {error && (
        <Text color={"red"} fontWeight={"bold"}>
          {error.message}
        </Text>
      )}
      <Menu>
        <TableContainer>
          <Table variant="simple" width={"100%"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Task Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.pages.map((item, index) => (
                <Fragment key={index}>
                  {item?.map((item) => (
                    <Tr>
                      <Td>{item.id}</Td>
                      <Td>{item.title}</Td>
                    </Tr>
                  ))}
                </Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Menu>

      <HStack justifyContent={"center"}>
        <Button
          onClick={() => fetchNextPage()}
          colorScheme="blue"
          disabled={isFetchingNextPage}
          marginLeft={2}
          marginTop={2}
        >
          {isFetchingNextPage ? "Fetching..." : "Load more..."}
        </Button>
      </HStack>
    </>
  );
}

export default TodoList;
