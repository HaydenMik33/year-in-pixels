import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import route_Private from "../../../routes/route_Private";
import { connect } from "react-redux";
import { Card, CardText, CardActions } from "material-ui/Card";
import { getUser } from "../../../ducks/userReducer";
import { getAllPixels, sendIlgiToReducer } from "../../../ducks/pixelReducer";
import axios from "axios";
import { RaisedButton } from "material-ui";
import Snackbar from "material-ui/Snackbar";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      navSwitch: false,
      ilgi: [],
      quote: {},
      openSnackbar: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  componentDidMount() {
    this.props
      .getUser()
      .then(user => {
        axios.get(`/api/ilgi/${user.value.data.id}`).then(res => {
          if (res.data[0]) {
            this.setState({ ilgi: res.data[0] });
            this.props.sendIlgiToReducer(res.data[0]);
            this.props.getAllPixels(res.data[0].id);
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
  toggleNav() {
    this.setState({ navSwitch: !this.state.navSwitch });
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
    return (
      <div>
        {navSwitch ? (
          <div className="sidenav">
            <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={this.toggleNav}
            >
              &times;
            </a>
            <Link to="/home" onClick={this.toggleNav}>
              Home
            </Link>
            <Link to="/home/ilgi" onClick={this.toggleNav}>
              2018 in Pixels
            </Link>
            <Link to="/home/graph" onClick={this.toggleNav}>
              2018 in graphs
            </Link>
            <Link to="/home/inbox" onClick={this.toggleNav}>
              Inbox
            </Link>
            <Link to="/home/profile" onClick={this.toggleNav}>
              Profile
            </Link>
            <Link to="/home/setting" onClick={this.toggleNav}>
              Setting
            </Link>
            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
          </div>
        ) : null}
        <span className="nav" onClick={this.toggleNav}>
          &#9776; OPEN
        </span>
        {this.props.history.location.pathname === "/home" ? (
          <div className="Home">
            <div className="home_top">
              <div className="home_left">
                <Card className="Home_Gallery">
                  <CardText>someText for my Gallery</CardText>
                </Card>

                <Card className="Home_Event">
                  <CardText>someTextMemo card</CardText>
                </Card>
              </div>
              <Card className="Home_Quote">
                <div className="Home_quoteBox">
                  <p className="Home_quoteBox_quote">
                    {this.state.quote.quote}
                  </p>
                  <p className="Home_quoteBox_author">{`-By  ${
                    this.state.quote.author
                  }`}</p>
                  <CardActions>
                    <RaisedButton
                      label="Save"
                      onClick={() => this.saveQuote()}
                    />
                    <RaisedButton
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
            <Card className="Recent card">
              <CardText>recent post</CardText>
            </Card>
          </div>
        ) : (
          <div>{route_Private}</div>
        )}
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.userReducer.user
  };
}

export default connect(mapStateToProps, {
  getUser,
  getAllPixels,
  sendIlgiToReducer
})(Home);
