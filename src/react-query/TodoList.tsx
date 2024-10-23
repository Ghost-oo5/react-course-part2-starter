import { Button, HStack, Menu, MenuItem, MenuList, Spinner, Text } from "@chakra-ui/react";
import useTodos from "./Hooks/useTodos";
import { Fragment, useState } from "react";

function TodoList() {
  const pageSize = 10;
  // const [page, setPage] = useState(1);
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = useTodos({pageSize });
  return (
    <>
      {isLoading && <Spinner color="red"></Spinner>}
      {error && (
        <Text color={"red"} fontWeight={"bold"}>
          {error.message}
        </Text>
      )}
      <Menu>
       {data?.pages.map((item, index)=>
       <Fragment key={index}>
         {item?.map((item) => (
          <MenuItem bg={"gray.700"} margin={2} borderRadius={5} key={item.id}>
            {item.id}: {item.title}
          </MenuItem>
        ))}
       </Fragment>
      )}
      </Menu>
      <HStack justifyContent={'center'}>
        <Button onClick={()=>fetchNextPage()} colorScheme="blue"   disabled={isFetchingNextPage} marginLeft={2}>{(isFetchingNextPage)?'Fetching...':'Load more...'}</Button>
      </HStack>
    </>
  );
}

export default TodoList;
