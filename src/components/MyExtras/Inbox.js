import React, { Component } from "react";
import "./inbox.css";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import FontIcon from "material-ui/FontIcon";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { getAllQuote } from "../../ducks/quoteReducer";
import Gallery from "./Gallery/Gallery";
import Event from "./Event/Event";
import Quote from "./Quote/Quote";
const GalleryIcon = <FontIcon className="material-icons">GalleryIcon</FontIcon>;
const QuoteIcon = <FontIcon className="material-icons">QuoteIcon</FontIcon>;
const EventIcon = <FontIcon className="material-icons">EventIcon </FontIcon>;

class Inbox extends Component {
  state = {
    selectedIndex: 0
  };

  select = index => this.setState({ selectedIndex: index });
  componentDidMount() {
    const { getAllQuote, ilgi, quotes } = this.props;
    getAllQuote(ilgi.id);
  }
  render() {
    return (
      <div className="Inbox">
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Gallery"
              icon={GalleryIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="My Quote"
              icon={QuoteIcon}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="Event"
              icon={EventIcon}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
        {this.state.selectedIndex === 0 ? (
          <Gallery />
        ) : this.state.selectedIndex === 1 ? (
          <Quote quotes={this.props.quotes} />
        ) : this.state.selectedIndex === 2 ? (
          <Event />
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    quotes: state.quoteReducer.quotes,
    ilgi: state.pixelReducer.ilgi
  };
}
export default connect(mapStateToProps, { getAllQuote })(Inbox);
