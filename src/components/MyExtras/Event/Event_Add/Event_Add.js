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
import { pushCurrentEvent } from "../../../../ducks/eventReducer";

class Event_Add extends Component {
  componentDidMount() {
    let ilgi_id = this.props.ilgi.id;
    const { currentEvent, pushCurrentEvent } = this.props;
    currentEvent
      ? this.setState({
          date: currentEvent.date,
          text: currentEvent.text,
          title: currentEvent.title,
          location: currentEvent.location,
          important: currentEvent.important
        })
      : console.log("hit");
    axios
      .post("/api/event", {
        ilgi_id
      })
      .then(res => {
        pushCurrentEvent(res.data[0]);
      });
  }
  state = {
    currentEventID: null,
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
  save() {
    const { important, text, title, location } = this.state;
    let ilgi_id = this.props.ilgi.id;
    let id = this.props.currentEvent.id;
    const formatDate = moment(this.state.date).format("DD-MM-YYYY");
    const date = moment(formatDate, "DD-MM-YYYY");
    let day = date.date();
    let month = Number(date.month()) + 1;
    let pixel_unique = month * 100 + Number(day);
    axios
      .post(`/api/event/${id}/${ilgi_id}`, {
        formatDate,
        title,
        text,
        important,
        location,
        pixel_unique
      })
      .then(() => {
        this.props.pushCurrentEvent({});
        this.props.history.push("/inbox");
      });
  }

  render() {
    console.log(this.state.important);
    console.log(this.props.currentEvent);
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
                this.props.pushCurrentEvent({});
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
            placeHolder="Event name"
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
            placeHolder="Location"
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
    ilgi: state.userReducer.ilgi,
    currentEvent: state.eventReducer.currentEvent
  };
}

export default connect(mapStateToProps, { pushCurrentEvent })(Event_Add);
