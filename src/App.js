import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Lobby from "./routes/Lobby.js";
import Main from "./routes/Main.js";
import { useResources } from "./context/ResourceContext.js";

function App() {
  const { ipAddress, portNum } = useResources();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Lobby ipAddress={ipAddress} portNum={portNum} />}
          ></Route>
          <Route
            path="/main/:roomnumber"
            element={<Main ipAddress={ipAddress} portNum={portNum} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
