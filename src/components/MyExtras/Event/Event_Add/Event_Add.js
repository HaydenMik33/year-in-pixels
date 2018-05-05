import React, { Component } from "react";
import "./Event_Add.css";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd, { ContentNextWeek } from "material-ui/svg-icons/content/add";
import DatePicker from "material-ui/DatePicker";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import { addEvent } from "../../../../ducks/eventReducer";
import moment from "moment";

class Event_Add extends Component {
  state = {
    date: null,
    title: null,
    text: null,
    location: null,
    important: false
  };
  save() {
    const { important, text, title, location } = this.state;
    const { ilgi } = this.props;
    const formatDate = moment(this.state.date).format("DD-MM-YYYY");
    let empty = [];
    let arr = formatDate.split("");
    let month = (arr[5] !== 0
      ? empty.push(arr[5], arr[6])
      : empty.push(arr[6])
    ).toString();
    let day = (arr[8] !== 0
      ? empty.push(arr[8], arr[9])
      : empty.push(arr[9])
    ).toString();
    let pixel_unique = Number(month) * 100 + Number(day);
    this.props
      .addEvent(
        formatDate,
        title,
        text,
        important,
        location,
        pixel_unique,
        ilgi.id
      )
      .then(() => this.props.history.push("/home/inbox"));
  }

  render() {
    return (
      <div className="Event_Add">
        <Paper className="Event_Add_container">
          <div className="Event_Add_header">
            <FlatButton
              label="Save"
              primary={true}
              onClick={() => this.save()}
            />
            <FlatButton
              label="cancel"
              onClick={() => this.props.history.push("/home/inbox")}
            />
          </div>
          <input
            className="Event_Add_input Event_Add_input-title"
            defaultValue="Event name"
            value={this.state.title}
            onClick={
              this.state.title === null
                ? () => this.setState({ title: "" })
                : null
            }
            onChange={e => this.setState({ title: e.target.value })}
          />
          <div className="Event_DatePicker">
            <DatePicker
              hintText="Select date"
              value={this.state.date}
              onChange={(e, date) => this.setState({ date: date })}
            />
          </div>
          <input
            className="Event_Add_input Event_Add_input-location"
            defaultValue="Location"
            value={this.state.location}
            onClick={
              this.state.location === null
                ? () => this.setState({ location: "" })
                : null
            }
            onChange={e => this.setState({ location: e.target.value })}
          />
          <textarea
            className="Event_Add_input Event_Add_input-text"
            onChange={e => this.setState({ text: e.target.value })}
          />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ilgi: state.pixelReducer.ilgi
  };
}

export default connect(mapStateToProps, { addEvent })(Event_Add);
