import React, { Component } from "react";
import "./inbox.css";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import Paper from "material-ui/Paper";
const yearIcon = <FontIcon className="material-icons">By year</FontIcon>;
const monthIcon = <FontIcon className="material-icons">By month</FontIcon>;
const colorIcon = <FontIcon className="material-icons">By color</FontIcon>;

class Inbox extends Component {
  state = {
    selectedIndex: 0
  };

  select = index => this.setState({ selectedIndex: index });

  render() {
    return (
      <div className="Inbox">
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label=""
              icon={yearIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="월별"
              icon={monthIcon}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="색깔별"
              icon={colorIcon}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
        {this.state.selectedIndex === 0 ? (
          <div>first one</div>
        ) : this.state.selectedIndex === 1 ? (
          <div> second one</div>
        ) : this.state.selectedIndex === 2 ? (
          <div>third one</div>
        ) : null}
      </div>
    );
  }
}
export default Inbox;
