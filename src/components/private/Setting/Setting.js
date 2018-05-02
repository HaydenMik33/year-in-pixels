import React, { Component } from "react";
import "./Setting.css";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Checkbox from "material-ui/Checkbox";
import Toggle from "material-ui/Toggle";
class Setting extends Component {
  render() {
    const styles = {
      root: {
        display: "flex",
        flexWrap: "wrap"
      }
    };
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
          <Subheader>Hangout Notifications</Subheader>
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Notifications"
            secondaryText="Allow notifications"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Sounds"
            secondaryText="Hangouts message"
          />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Video sounds"
            secondaryText="Hangouts video call"
          />
        </List>

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
      </div>
    );
  }
}

export default Setting;
