import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dictionaries from "./components/dictionaries";

function App() {
  return (
    <main role="main" className="container">
      <Dictionaries />
    </main>
  );
}

export default App;
