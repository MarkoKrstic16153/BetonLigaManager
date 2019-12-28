import React from "react";
import Igrac from "./componets/Igrac";
import { Button } from "antd";
import "./App.css";
import DodajIgraca from "./componets/DodajIgraca";

const App = () => {
  return (
    <div className="App">
      <DodajIgraca />
    </div>
  );
};

export default App;
