import React, { Component } from "react";
import "./Profile.css";
import { Switch, Route, Link } from "react-router-dom";
import Setting from "../Setting/Setting";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
class Profile extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route path="/home/profile/setting" component={Setting} />
        </Switch>
        <List>
          <ListItem>
            <h1>Profile</h1>
          </ListItem>
          <ListItem>
            <p>
              Username
              <br /> {this.props.user.displayname}
              <br />
              <br />
            </p>
          </ListItem>
          <ListItem>
            <p>
              AuthId
              <br /> {this.props.user.authid}
              <br />
            </p>
          </ListItem>
          <ListItem>
            <p>Your Ilgi Title</p>
            <h3>[ {this.props.ilgi.title} ]</h3>
          </ListItem>

          <img src={this.props.user.picture} width="300" alt="profile" />
          <Link to="/home/profile">
            <br /> <FlatButton label="Edit" />
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem />
        </List>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer.user,
  ilgi: state.pixelReducer.ilgi
});

export default connect(mapStateToProps, { getUser })(Profile);
