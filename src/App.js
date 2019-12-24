import React from "react";
import "./App.css";
import Robot from "./component/";
import qoutes from "./options.json";
const App = () => {
  return (
    <div className="App">
      <Robot
        data={qoutes}
        number={Math.floor(Math.random() * 5) + 1}
        flag={!!Math.floor(Math.random() * 2)}
      />
    </div>
  );
};

export default App;
