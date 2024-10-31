import { Button, Heading, HStack } from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import CounterReducer from "./reducers/CounterReducer";

function Counter() {
  // const [value, setValue] = useState(0)
  const [value, dispatch] =useReducer(CounterReducer, 0);
  return (
    <>
      <Heading>Count: {value}</Heading>
      <HStack>
        <Button onClick={() => dispatch({type:'RESET'})}>Reset</Button>
        <Button onClick={() => dispatch({type:'INCREMENT'})}>Increment</Button>
      </HStack>
    </>
  );
}

export default Counter;
