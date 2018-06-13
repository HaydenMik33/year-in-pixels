import React, { Component } from "react";
import "./Graph.css";
import { connect } from "react-redux";

class Graph extends Component {
  render() {
    return <div className="Graph" />;
  }
}
function mapStateToProps(state) {
  return {
    ...state.pixelReducer
  };
}
export default connect(mapStateToProps)(Graph);
