import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import PostList from "./react-query/PostList";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Grid templateAreas={`'nav' 'main'`} templateColumns={'1fr'}>
        <GridItem area={"nav"} marginBottom={3} >
          <Navbar />
        </GridItem>
        <GridItem area={"main"}>
          {/* <PostList/> */}
          <TodoForm />
          <TodoList />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
