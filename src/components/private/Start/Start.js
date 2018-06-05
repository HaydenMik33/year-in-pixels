import React, { Component } from "react";
import "./Start.css";
import axios from "axios";
class Start extends Component {
  state = {
    title: []
  };

  newIlgi(title) {
    axios
      .post("/api/ilgi", { title })
      .then(ilgi => {
        console.log(ilgi.data);
        this.props.history.push("/home");
      })
      .catch(console.log);
  }
  render() {
    return (
      <div className="start">
        <div className="start_content">
          <h3>
            Name Your <span className="start_ILGI smallerI">ILGI</span>
          </h3>
          <input onChange={e => this.setState({ title: e.target.value })} />
          <br />
          <button onClick={() => this.newIlgi(this.state.title)}>Start</button>
        </div>
      </div>
    );
  }
}

export default Start;
