import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import route_Private from "../../../routes/route_Private";
import { connect } from "react-redux";
import { Card, CardText } from "material-ui/Card";
import { getUser } from "../../../ducks/userReducer";
import { getAllPixels, sendIlgiToReducer } from "../../../ducks/pixelReducer";

import axios from "axios";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      navSwitch: false,
      ilgi: []
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  componentDidMount() {
    this.props
      .getUser()
      .then(user => {
        console.log(user.value.data.id);
        axios.get(`/api/ilgi/${user.value.data.id}`).then(res => {
          if (res.data[0]) {
            this.setState({ Ilgi: res.data[0] });
            this.props.sendIlgiToReducer(res.data[0]);
            this.props.getAllPixels(res.data[0].id);
          } else {
            this.props.history.push("/home/start");
          }
        });
      })
      .catch(console.log);
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
            <Link to="/home" onClick={this.toggleNav}>
              Home
            </Link>
            <Link to="/home/ilgi" onClick={this.toggleNav}>
              2018 in Pixels
            </Link>
            <Link to="/home/graph" onClick={this.toggleNav}>
              2018 in graphs
            </Link>
            <Link to="/home/inbox" onClick={this.toggleNav}>
              Inbox
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
        {this.props.history.location.pathname === "/home" ? (
          <div className="Home">
            <div className="home_top">
              <div className="home_left">
                <Card className="Gallery card">
                  <CardText>someText for my Gallery</CardText>
                </Card>

                <Card className="Memo card">
                  <CardText>someTextMemo card</CardText>
                </Card>
              </div>
              <Card className="Quote card">
                <CardText>someText Quote</CardText>
              </Card>
            </div>
            <Card className="Recent card">
              <CardText>recent post</CardText>
              {/* I'm not too sure how to handle this data flow 
          
               but you can try this by adding refresh button on here */}
            </Card>
          </div>
        ) : (
          <div>{route_Private}</div>
        )}
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.userReducer.user
  };
}

export default connect(mapStateToProps, {
  getUser,
  getAllPixels,
  sendIlgiToReducer
})(Home);
