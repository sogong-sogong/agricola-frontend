import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Lobby from "./routes/Lobby.js";
import Main from "./routes/Main.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby />}></Route>
          <Route path="/main" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
