import React, { Component } from "react";
import "./Event_Add.css";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd, { ContentNextWeek } from "material-ui/svg-icons/content/add";
import DatePicker from "material-ui/DatePicker";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import star from "../../../../icon/star.png";
import starSolid from "../../../../icon/starSolid.png";

class Event_Add extends Component {
  state = {
    date: null,
    title: null,
    text: null,
    location: null,
    important: false
  };
  markImportant() {
    console.log("clicked");
    this.setState({ important: !this.state.important });
  }
  save = () => {
    const { important, text, title, location, date } = this.state;
    const { history, match } = this.props;
    const formatDate = moment(date).format("MM-DD-YYYY");
    const myDate = moment(formatDate, "MM-DD-YYYY");
    let day = myDate.date();
    let month = Number(myDate.month()) + 1;
    let pixel_unique = month * 100 + Number(day);
    console.log(day, month, pixel_unique, myDate, formatDate);
    axios
      .post(`/api/event`, {
        formatDate,
        title,
        text,
        important,
        location,
        pixel_unique
      })
      .then(() => {
        if (match.params.pixel_unique === 200) {
          history.push("/ilgi");
        } else {
          history.push("/inbox");
        }
      });
  };

  render() {
    console.log(this.props);
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
              onClick={() => {
                this.props.history.push("/inbox");
              }}
            />
            {this.state.important === false ? (
              <img
                className="Event_star"
                src={star}
                width="30px"
                onClick={() => this.markImportant()}
              />
            ) : (
              <img
                className="Event_starSolid Event_star"
                src={starSolid}
                width="30px"
                onClick={() => this.markImportant()}
              />
            )}
          </div>

          <input
            className="Event_Add_input Event_Add_input-title"
            placeholder="Event name"
            onChange={e => this.setState({ title: e.target.value })}
          />
          <div className="Event_DatePicker">
            <DatePicker
              hintText="Select date"
              onChange={(e, date) => this.setState({ date: date })}
            />
          </div>
          <input
            className="Event_Add_input Event_Add_input-location"
            placeholder="Location"
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
  return {};
}

export default connect(mapStateToProps)(Event_Add);
