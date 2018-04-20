import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import route_Private from "../../../routes/route_Private";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      navSwitch: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }
  toggleNav() {
    this.setState({ navSwitch: !this.state.navSwitch });
  }

  render() {
    const { navSwitch } = this.state;
    return (
      <div>
        {navSwitch ? (
          <div className="sidenav">
            <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={this.toggleNav}
            >
              &times;
            </a>
            <Link to="/home/ilgi" onClick={this.toggleNav}>
              2018 in Pixels
            </Link>
            <Link to="/home/profile" onClick={this.toggleNav}>
              Profile
            </Link>
            <Link to="/home/setting" onClick={this.toggleNav}>
              Setting
            </Link>
            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
          </div>
        ) : null}
        <span className="nav" onClick={this.toggleNav}>
          &#9776; OPEN
        </span>
        <div>{route_Private}</div>
        <div className="Home">
          Hello This is just bunch of dummy texts
          <div />
        </div>
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.userReducer;
  return {
    user
  };
}

export default connect(mapStateToProps, { getUser })(Home);
