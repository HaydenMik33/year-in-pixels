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
class Home extends Component {
  state = {
    ilgi: [],
    quote: {},
    openSnackbar: false,
    open: false
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
        axios.get(`/api/ilgi/${user.value.data.id}`).then(res => {
          if (res.data[0]) {
            this.setState({ ilgi: res.data[0] });
            sendIlgiToReducer(res.data[0]);
            getAllPixels(res.data[0].id);
            getAllEvents(res.data[0].id);
            axios.get("/api/quote").then(quote => {
              this.setState({ quote: quote.data });
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
    console.log(text, author, tags, ilgi_id);
    this.setState({ openSnackbar: true });
    axios.post("/api/quote", { text, author, tags, ilgi_id });
  }
  refresh() {
    axios.get("/api/quote").then(quote => {
      console.log(quote);
      this.setState({ quote: quote.data });
    });
  }

  render() {
    const { navSwitch } = this.state;
    const styles = {
      Drawer: {
        background: "#263238"
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
            <div className="home_top">
              <div className="home_left">
                <Card className="Home_Event">
                  <CardText>upcomimg event</CardText>
                  <div />
                </Card>
              </div>
              <div className="Home_right">
                <Card className="Home_RecentMood">
                  <CardText>recent mood</CardText>
                </Card>
                <Card className="Home_Quote">
                  <div className="Home_quoteBox">
                    <p className="Home_quoteBox_quote">
                      {this.state.quote.quote}
                    </p>
                    <p className="Home_quoteBox_author">{`-By  ${
                      this.state.quote.author
                    }`}</p>
                    <CardActions>
                      <FlatButton
                        label="Save"
                        onClick={() => this.saveQuote()}
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
                        onRequestClose={() =>
                          this.setState({ openSnackbar: false })
                        }
                      />
                    </CardActions>
                  </div>
                </Card>
              </div>
            </div>
            <Card className="Home_Gallery">
              <CardText>someText for my Gallery</CardText>
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
    ...state.eventReducer.events
  };
}

export default connect(mapStateToProps, {
  getUser,
  getAllPixels,
  sendIlgiToReducer,
  getAllEvents
})(Home);
