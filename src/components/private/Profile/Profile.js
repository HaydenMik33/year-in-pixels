import React, { Component } from "react";
import "./Profile.css";
import { Switch, Route, Link } from "react-router-dom";
import Setting from "../Setting/Setting";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
class Profile extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    // console.log(this.props.user);
    return (
      <div>
        <Switch>
          <Route path="/home/profile/setting" component={Setting} />
        </Switch>
        <p>
          Username :{this.props.user.displayname}
          <br />
          AuthId : {this.props.user.authid}
        </p>
        <img src={this.props.user.picture} width="300" alt="profile" />
        <Link to="/home/profile/setting">
          <button>Edit</button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({ ...state.userReducer });

export default connect(mapStateToProps, { getUser })(Profile);
