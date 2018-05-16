import React, { Component } from "react";
import "./App.css";
import route_Private from "./routes/route_Private";
import { withRouter } from "react-router";
import Welcome from "./components/public/Welcome/Welcome";
import Nav from "./components/public/Nav/Nav";
class App extends Component {
  render() {
    return (
      <div className="App">
        {
          (this.props.history.location.pathname = "/" ? (
            <Welcome />
          ) : (
            <div className="Main">
              <Nav />
              {route_Private}
            </div>
          ))
        }
      </div>
    );
  }
}

export default withRouter(App);
