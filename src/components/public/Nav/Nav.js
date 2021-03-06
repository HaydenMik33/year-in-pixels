import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";

class Nav extends Component {
  state = {
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  render() {
    const styles = {
      Drawer: {
        background: "#263238"
      }
    };

    return (
      <div>
        <span className="hamburger" onClick={this.handleToggle}>
          &#9776;
        </span>
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          containerStyle={styles.Drawer}
          onRequestChange={open => this.setState({ open })}
        >
          <Link
            className="Nav_link Nav_link1"
            to="/home"
            onClick={this.handleClose}
          >
            HOME
          </Link>
          <Link className="Nav_link" to="/ilgi" onClick={this.handleClose}>
            2018 IN PIXELS
          </Link>
          <Link className="Nav_link" to="/graph" onClick={this.handleClose}>
            2018 IN GRAPHS
          </Link>
          <Link className="Nav_link" to="/inbox" onClick={this.handleClose}>
            INBOX
          </Link>
          <Link className="Nav_link" to="/profile" onClick={this.handleClose}>
            PROFILE
          </Link>
          <a
            className="Nav_link"
            href={process.env.REACT_APP_LOGOUT}
            onClick={this.handleClose}
          >
            LOGOUT
          </a>
        </Drawer>
      </div>
    );
  }
}

export default Nav;
