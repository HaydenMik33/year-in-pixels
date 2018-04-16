import React, { Component } from "react";
import "./App.css";
import route_Public from "./routes/route_Public";
class App extends Component {
  render() {
    return <div className="App">{route_Public}</div>;
  }
}

export default App;
