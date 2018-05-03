import React, { Component } from "react";
import "./Setting.css";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Checkbox from "material-ui/Checkbox";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import axios from "axios";
class Setting extends Component {
  deleteIlgi(ilgi_id) {
    axios.delete(`/api/ilgi/${ilgi_id}`).then(() => {
      this.props.history.push("/home");
    });
  }
  ////////////
  //////////        inside of setting put profile on
  //////////////
  render() {
    const styles = {
      root: {
        display: "flex",
        flexWrap: "wrap"
      }
    };
    console.log(this.props);
    return (
      <div style={styles.root}>
        <List>
          <Subheader>General</Subheader>
          <ListItem
            primaryText="Profile photo"
            secondaryText="Change your Google+ profile photo"
          />
          <ListItem
            primaryText="Show your status"
            secondaryText="Your status is visible to everyone you use with"
          />
        </List>
        <Divider />
        <List>
          <ListItem
            primaryText="When calls and notifications arrive"
            secondaryText="Always interrupt"
          />
        </List>
        <Divider />
        <List>
          <Subheader>Priority Interruptions</Subheader>
          <ListItem
            primaryText="Events and reminders"
            rightToggle={<Toggle />}
          />
          <ListItem primaryText="Calls" rightToggle={<Toggle />} />
          <ListItem primaryText="Messages" rightToggle={<Toggle />} />
        </List>
        <Divider />
        <List>
          <Subheader>Hangout Notifications</Subheader>
          <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
          <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
          <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
        </List>
        <Divider />
        <p
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you wish to delete your whole Ilgi for this year?"
              )
            )
              this.deleteIlgi(this.props.ilgi.id);
          }}
        >
          Delete 2018 Ilgi
        </p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ilgi: state.pixelReducer.ilgi
  };
}
export default connect(mapStateToProps)(Setting);
