import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResourceProvider } from "./context/ResourceContext";
import "./App.css";
import Lobby from "./routes/Lobby.js";
import Main from "./routes/Main.js";

function App() {
  return (
    <ResourceProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lobby />}></Route>
            <Route path="/main/:roomnumber" element={<Main />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ResourceProvider>
  );
}

export default App;
