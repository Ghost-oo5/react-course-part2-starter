import "./App.css";
import HomePage from "./state-management/HomePage";

function App() {
  return (
    <>
      {/* <Grid templateAreas={`'nav' 'main'`} templateColumns={'1fr'}>
        <GridItem area={"nav"} marginBottom={3} >
          <Navbar />
        </GridItem>
        <GridItem area={"main"}>
         
          <TodoForm />
          <TodoList />
        </GridItem>
      </Grid> */}

      <HomePage/>
    </>
  );
}

export default App;
