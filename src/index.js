import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import MuiThemeProvier from "material-ui/styles/MuiThemeProvider";
import store from "./store";
import "./index.css";
import App from "./App";
ReactDOM.render(
  <MuiThemeProvier>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvier>,
  document.getElementById("root")
);
