import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import route_Private from "../../../routes/route_Private";
import { connect } from "react-redux";
import { Card, CardText, CardActions } from "material-ui/Card";
import { getUser } from "../../../ducks/userReducer";
import { getAllPixels, sendIlgiToReducer } from "../../../ducks/pixelReducer";
import { getAllEvents } from "../../../ducks/eventReducer";
import axios from "axios";
import { FlatButton } from "material-ui";
import Snackbar from "material-ui/Snackbar";
import Drawer from "material-ui/Drawer";
import moment from "moment";
import { colors } from "material-ui/styles";
class Home extends Component {
  state = {
    user: [],
    ilgi: [],
    quote: {},
    recentColor: "",
    recentColorOpacity: "",
    openSnackbar: false,
    open: false,
    Hayden: function() {
      return <div>dkak</div>;
    }
  };

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  componentDidMount() {
    const {
      getUser,
      getAllEvents,
      getAllPixels,
      sendIlgiToReducer
    } = this.props;
    getUser()
      .then(user => {
        this.setState({ user: user.value.data });
        axios.get(`/api/ilgi/${user.value.data.id}`).then(res => {
          if (res.data[0]) {
            this.setState({ ilgi: res.data[0] });
            sendIlgiToReducer(res.data[0]);
            getAllPixels(res.data[0].id);
            getAllEvents(res.data[0].id);
            axios.get("/api/quote").then(quote => {
              this.setState({
                quote: quote.data,
                Hayden: this.calculate(),
                recentColor: this.props.pixels[this.props.pixels.length - 1]
                  .colorvalue,
                recentColorOpacity: this.props.pixels[
                  this.props.pixels.length - 1
                ].opacity
              });
            });
          } else {
            this.props.history.push("/home/start");
          }
        });
      })
      .catch(console.log);
  }

  saveQuote() {
    const { quote, ilgi } = this.state;
    let text = quote.quote;
    let author = quote.author;
    let tags = quote.cat;
    let ilgi_id = ilgi.id;
    this.setState({ openSnackbar: true });
    axios.post("/api/quote", { text, author, tags, ilgi_id });
  }
  refresh() {
    axios.get("/api/quote").then(quote => {
      console.log(quote);
      this.setState({ quote: quote.data });
    });
  }

  calculate() {
    const DayOfYear = this.props.events.map((el, i) => {
      return moment(el.date, "DD-MM-YYYY").dayOfYear();
    });

    const upComingEvent = Math.min(...DayOfYear);
    const styles = {
      elTitle: {
        textShadow: "3px 3px lightskyblue",
        fontSize: "36px"
      },
      elDate: {
        color: "RoyalBlue"
      }
    };
    const displayUpcomingEvent = this.props.events
      .filter(el => moment(el.date, "DD-MM-YYYY").dayOfYear() === upComingEvent)
      .map((el, i) => {
        if (moment(el.date, "DD-MM-YYY12Y").dayOfYear() !== upComingEvent) {
          return null;
        }
        return (
          <div key={i} className="Home_Event_upcomingEvent-div">
            <h1 style={styles.elTitle}>{el.title}</h1>
            <h3 style={styles.elDate}>{el.date}</h3>
            <p>{el.text}</p>
            <p>{el.location}</p>
          </div>
        );
      });
    return displayUpcomingEvent;
  }

  render() {
    const { navSwitch } = this.state;
    const styles = {
      Drawer: {
        background: "#263238"
      },
      Paper: {
        fontFamily: "'Open Sans',sans serif"
      },
      elTitle: {
        fontShadow: "RoyalBlue"
      },
      elDate: {
        color: "RoyalBlue"
      },
      mood: {
        background: this.state.recentColor,
        color: "white",
        opacity: this.state.recentColorOpacity
      }
    };

    return (
      <div className="container-for-privateComponents">
        <div className="Home_header">
          <span className="hamburger" onClick={this.handleToggle}>
            &#9776;
          </span>
        </div>
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          containerStyle={styles.Drawer}
          onRequestChange={open => this.setState({ open })}
        >
          <Link
            className="Home_nav-link Home_nav-link1"
            to="/home"
            onClick={this.handleClose}
          >
            HOME
          </Link>
          <Link
            className="Home_nav-link"
            to="/home/ilgi"
            onClick={this.handleClose}
          >
            2018 IN PIXELS
          </Link>
          <Link
            className="Home_nav-link"
            to="/home/graph"
            onClick={this.handleClose}
          >
            2018 IN GRAPHS
          </Link>
          <Link
            className="Home_nav-link"
            to="/home/inbox"
            onClick={this.handleClose}
          >
            INBOX
          </Link>
          <Link
            className="Home_nav-link"
            to="/home/profile"
            onClick={this.handleClose}
          >
            PROFILE
          </Link>
          <Link
            className="Home_nav-link"
            to="/home/setting"
            onClick={this.handleClose}
          >
            SETTING
          </Link>
          <a
            className="Home_nav-link"
            href={process.env.REACT_APP_LOGOUT}
            onClick={this.handleClose}
          >
            LOGOUT
          </a>
        </Drawer>

        {this.props.history.location.pathname === "/home" ? (
          <div className="Home">
            <div className="Home_animatedHeader Home_animatedHeader-show">
              <h1 className="Home_animatedHeader_h1">{`Welcome       ${
                this.state.user.displayname
              }`}</h1>
            </div>
            <div className="Home_titleHeader_outer">
              <h1 className="Home_titleHeader-h1">[ ilgi ]</h1>
              <div className="Home_titleHeader" />
              <p className="Home_titleHeader-p">COLOR YOOUR PIXEL</p>
              <Link to="/home/ilgi">
                <div class="Home_css-button">
                  <p class="Home_css-button-text">Color</p>
                  <div class="Home_css-button-inner">
                    <div class="reset-skew">
                      <p class="Home_css-button-inner-text">>></p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <svg className="arrow">
              <path className="a1" d="M0 0 L30 22 L60 0" />
              <path className="a2" d="M0 20 L30 42 L60 20" />
              <path className="a3" d="M0 40 L30 62 L60 40" />
            </svg>
            <Card className="Home_Event" style={styles.Paper}>
              <h1 className="Home_upcoming-h1">Upcoming Event</h1>
              {this.state.Hayden}
            </Card>
            <Card className="Home_RecentMood" style={styles.Paper}>
              <div className="Home_RecentMood_container" style={styles.mood}>
                <h3> Your Recent color </h3>
              </div>
            </Card>
            <Card className="Home_Quote" style={styles.Paper}>
              <div className="Home_quoteBox">
                <i className="fas fa-quote-left" />
                <p className="Home_quoteBox_quote">{this.state.quote.quote}</p>
                <i className="fas fa-quote-right" />
                <p className="Home_quoteBox_author">{`-By  ${
                  this.state.quote.author
                }`}</p>
              </div>
              <CardActions>
                <FlatButton
                  label="Save"
                  onClick={() => this.saveQuote()}
                  primary={true}
                />
                <FlatButton
                  label="Refresh"
                  onClick={() => {
                    this.refresh();
                  }}
                />
                <Snackbar
                  className="Home_snackBar"
                  open={this.state.openSnackbar}
                  message="Quote just added to your inbox"
                  autoHideDuration={4000}
                  onRequestClose={() => this.setState({ openSnackbar: false })}
                />
              </CardActions>
            </Card>
          </div>
        ) : (
          <div className="Home_route_private">{route_Private}</div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.userReducer.user,
    events: state.eventReducer.events,
    pixels: state.pixelReducer.pixels
  };
}

export default connect(mapStateToProps, {
  getUser,
  getAllPixels,
  sendIlgiToReducer,
  getAllEvents
})(Home);
