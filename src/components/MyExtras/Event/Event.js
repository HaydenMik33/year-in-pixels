import React from "react";
import "./Event.css";
import Paper from "material-ui/Paper";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const Event = props => {
  console.log(props);
  const eventsList = props.events.map((el, i) => {
    return (
      <Paper zDepth={1} key={i} className="Event_box">
        <h1 className="Event_title">{el.title}</h1>
        <p className="Event_location">{el.loaction}</p>
        <p className="Event_text">{el.text}</p>
      </Paper>
    );
  });
  return (
    <div className="Event">
      <div className="Event_container">{eventsList}</div>
      <Link to="/home/inbox/addEvent">
        <FloatingActionButton className="Event_add_button">
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    events: state.eventReducer.events
  };
}
export default connect(mapStateToProps)(Event);
