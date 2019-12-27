import React from "react";
import Igrac from "./componets/Igrac";
import { Button } from 'antd';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Igrac />
      <Button type="primary">Button</Button>
    </div>
  );
};

export default App;
