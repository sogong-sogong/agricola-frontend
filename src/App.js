import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResourceProvider } from "./context/ResourceContext";
import "./App.css";
import Lobby from "./routes/Lobby.js";
import Main from "./routes/Main.js";

function App() {
  // API 호출 주소
  //const ipAddress = "localhost";
  const ipAddress = "172.17.74.133";
  const portNum = "8080";

  return (
    <ResourceProvider>
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
    </ResourceProvider>
  );
}

export default App;
