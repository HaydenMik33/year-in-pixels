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
import PhotoLibrary from "material-ui/svg-icons/image/photo-library";
import FormatQuote from "material-ui/svg-icons/editor/format-quote";
import EventNote from "material-ui/svg-icons/notification/event-note";
const GalleryIcon = <PhotoLibrary />;
const QuoteIcon = <FormatQuote />;
const EventIcon = <EventNote />;
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
    console.log(this.props);
    const styles = {
      Paper: {
        fontFamily: "'Open Sans', sans-serif"
      }
    };
    return (
      <div className="Inbox">
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Gallery"
              icon={GalleryIcon}
              onClick={() => {
                this.select(0);
              }}
              style={styles.Paper}
            />
            <BottomNavigationItem
              label="My Quote"
              icon={QuoteIcon}
              onClick={() => {
                this.select(1);
              }}
              style={styles.Paper}
            />
            <BottomNavigationItem
              label="Event"
              icon={EventIcon}
              onClick={() => {
                this.select(2);
              }}
              style={styles.Paper}
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
    ilgi: state.userReducer.ilgi
  };
}
export default connect(mapStateToProps, { getAllQuote })(Inbox);
