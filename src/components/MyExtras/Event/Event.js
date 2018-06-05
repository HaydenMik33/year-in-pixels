import React, { Component } from "react";
import "./Event.css";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllEvents,
  deleteEvent,
  pushCurrentEvent
} from "../../../ducks/eventReducer";
import moment from "moment";
class Event extends Component {
  componentDidMount() {
    this.props.getAllEvents(this.props.ilgi.id);
  }
  delete(id) {
    const { deleteEvent, getAllEvents, ilgi } = this.props;
    deleteEvent(id, ilgi.id).then(() => {
      getAllEvents(ilgi.id);
    });
  }
  pushData(event) {
    this.props.pushCurrentEvent(event);
  }

  render() {
    const styles = {
      Paper: {
        fontFamily: "'Open Sans', sans-serif"
      }
    };
    console.log(this.props);
    const dayName = date => moment(date).format("dddd");
    const day = date => moment(date, "DD-MM-YYYY").date();
    const month = date => moment(date).format("MMMM");
    const eventsList = this.props.events.map((el, i) => {
      return (
        <Paper zDepth={1} key={i} className="Event_box" style={styles.Paper}>
          <div className="Event_close" onClick={() => this.delete(el.id)} />
          {el.important ? (
            <i className="fas fa-bookmark Event_bookmark" />
          ) : null}
          <Link to="/inbox/addEvent">
            <span onClick={() => this.pushData(el)}>
              <i className="fas fa-edit Event_edit" />
            </span>
          </Link>
          <h1 className="Event_title">{el.title}</h1>
          <h3 className="Event_date">
            {el.date !== null
              ? `${dayName(el.date)}, ${month(el.date)} ${day(el.date)} `
              : null}
          </h3>
          <p className="Event_location">{el.loaction}</p>
          <p className="Event_text">{el.text}</p>
        </Paper>
      );
    });
    return (
      <div className="Event">
        <div className="Event_container">{eventsList}</div>
        <Link to="/inbox/addEvent">
          <FloatingActionButton className="Event_add_button">
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    events: state.eventReducer.events,
    ilgi: state.userReducer.ilgi
  };
}
export default connect(mapStateToProps, {
  getAllEvents,
  deleteEvent,
  pushCurrentEvent
})(Event);
