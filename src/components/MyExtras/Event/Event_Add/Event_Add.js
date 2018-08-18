// import React, { Component } from "react";
// import "./Event_Add.css";
// import DatePicker from "@material-ui/core/DatePicker";
// import Button from "@material-ui/core/Button";
// import { connect } from "react-redux";
// import { addEvent, updateEvent } from "../../../../ducks/eventReducer";
// import moment from "moment";
// import star from "../../../../icon/star.png";
// import starSolid from "../../../../icon/starSolid.png";

// class Event_Add extends Component {
//   state = {
//     date: null,
//     title: "",
//     text: "",
//     location: "",
//     important: false
//   };
//   componentDidMount() {
//     const { currentEvent, match, currentPixel } = this.props;
//     let e = currentEvent;
//     let p = currentPixel.pixel_unique;
//     let month = parseInt(p / 100);
//     let day = p - month * 100;
//     let date = `${month < 10 ? `0${month}` : month}-${
//       day < 10 ? `0${day}` : day
//     }-2018`;
//     console.log(date);
//     match.params.pixel_unique === "200"
//       ? this.setState(() => ({
//           date: moment(date)["_d"]
//         }))
//       : e
//         ? this.setState(() => ({
//             date: moment(e.date)["_d"],
//             title: e.title,
//             text: e.text,
//             location: e.location,
//             important: e.important
//           }))
//         : null;
//   }
//   markImportant() {
//     console.log("clicked");
//     this.setState({ important: !this.state.important });
//   }
//   save = () => {
//     const { important, text, title, location, date } = this.state;
//     const { history, match, addEvent, updateEvent, currentEvent } = this.props;
//     const formatDate = moment(date).format("MM-DD-YYYY");
//     const myDate = moment(formatDate, "MM-DD-YYYY");
//     let day = myDate.date();
//     let month = Number(myDate.month()) + 1;
//     let pixel_unique = month * 100 + Number(day);
//     console.log(day, month, pixel_unique, myDate, formatDate);
//     match.params.pixel_unique === "300"
//       ? updateEvent(
//           currentEvent.id,
//           formatDate,
//           title,
//           text,
//           important,
//           location,
//           pixel_unique
//         ).then(() => {
//           history.goBack();
//         })
//       : addEvent(
//           formatDate,
//           title,
//           text,
//           important,
//           location,
//           pixel_unique
//         ).then(() => {
//           history.goBack();
//         });
//   };

//   render() {
//     return (
//       <div className="Event_Add">
//         <div className="Event_Add_container">
//           <div className="Event_Add_header">
//             <Button
//               label="Save"
//               primary={true}
//               onClick={() => this.save()}
//             />
//             <Button
//               label="cancel"
//               onClick={() => {
//                 this.props.history.goBack();
//               }}
//             />
//             {this.state.important ? (
//               <img
//                 className="Event_starSolid Event_star"
//                 src={starSolid}
//                 width="30px"
//                 onClick={() => this.markImportant()}
//                 alt="starSolid"
//               />
//             ) : (
//               <img
//                 className="Event_star"
//                 src={star}
//                 width="30px"
//                 onClick={() => this.markImportant()}
//                 alt="star"
//               />
//             )}
//           </div>

//           <input
//             className="Event_Add_input Event_Add_input-title"
//             placeholder="Event name"
//             type="text"
//             value={this.state.title}
//             onChange={e => this.setState({ title: e.target.value })}
//           />
//           <div className="Event_DatePicker">
//             <DatePicker
//               hintText="Select date"
//               value={this.state.date}
//               onChange={(e, date) => this.setState({ date: date })}
//             />
//           </div>
//           <input
//             className="Event_Add_input Event_Add_input-location"
//             placeholder="Location"
//             value={this.state.location}
//             onChange={e => this.setState({ location: e.target.value })}
//           />
//           <textarea
//             className="Event_Add_input"
//             value={this.state.text}
//             onChange={e => this.setState({ text: e.target.value })}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     currentEvent: state.eventReducer.currentEvent,
//     currentPixel: state.pixelReducer.currentPixel
//   };
// }

// export default connect(
//   mapStateToProps,
//   { addEvent, updateEvent }
// )(Event_Add);
