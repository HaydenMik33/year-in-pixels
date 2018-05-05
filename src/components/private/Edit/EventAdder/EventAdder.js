import React, { Component } from "react";
import "./EventAdder.css";
import Paper from "material-ui/Paper";
import { Checkbox } from "material-ui";
class EventAdder extends Component {
  state = {
    title: "",
    text: "",
    location: "",
    important: false,
    checked: false,
    date: ""
  };
  render() {
    return (
      <Paper className="EventAdder">
        <div className="EventAdder_whole_container">
          <input
            className="EventAdder_input_title EventAdder_input"
            defaultValue="Event name"
          />
          <Checkbox
            label="important event"
            labelPosition="left"
            checked={this.state.checked}
            onCheck={() =>
              this.setState({
                checked: !this.state.checked,
                important: !this.state.important
              })
            }
          />
          <input
            className="EventAdder_input_location EventAdder_input"
            defaultValue="Location"
          />
          <input className="EventAdder_input_text EventAdder_input" />
        </div>
      </Paper>
    );
  }
}

export default EventAdder;
