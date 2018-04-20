import React, { Component } from "react";
import "./Start.css";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
class Start extends Component {
  constructor() {
    super();
    this.state = {
      Ilgi: [],
      title: [],
      user: []
    };
    this.newIlgi = this.newIlgi.bind(this);
  }
  componentDidMount() {
    getUser();
    console.log(this.props.user);
    this.setState({
      user: this.props.user
    });
  }
  newIlgi(title) {
    axios
      .post("/api/ilgi", { title })
      .then(res => {
        console.log(res.data);
      })
      .then(this.props.history.push("/home/ilgi"))
      .catch(console.log);
  }
  render() {
    return (
      <div className="start">
        <div className="start_content">
          <h1 className="start_h1">
            WELCOME TO <span className="start_ILGI">ILGI</span> <br />{" "}
            {this.state.user.displayname}
          </h1>
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

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}
export default connect(mapStateToProps, {
  getUser
})(Start);
