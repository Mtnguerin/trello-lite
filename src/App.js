import React from "react";
import { Container } from "@material-ui/core";
import Board from "./components/page/Board";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Container maxWidth="xl">
        <Board />
      </Container>
    </div>
  );
}

export default App;
