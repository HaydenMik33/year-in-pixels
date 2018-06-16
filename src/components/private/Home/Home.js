import React, { Component } from "react";
import "./Home.css";
import "./Home_animation.css";
import "./Home_mobile.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, getIlgi } from "../../../ducks/userReducer";
import { getAllPixels } from "../../../ducks/pixelReducer";
import { getAllEvents } from "../../../ducks/eventReducer";
import { FlatButton } from "material-ui";
import Snackbar from "material-ui/Snackbar";
import moment from "moment";
import axios from "axios";

class Home extends Component {
  state = {
    quote: {},
    recentColor: "",
    recentColorOpacity: "",
    openSnackbar: false,
    Hayden: function() {
      return <div>dkak</div>;
    }
  };

  componentDidMount() {
    const { getUser, getAllEvents, getAllPixels, getIlgi, pixels } = this.props;
    getUser();
    getIlgi().then(ilgi => {
      let res = ilgi.value.data[0];
      if (res) {
        getAllPixels().then(res => {
          let pixels = res.action.payload.data;
          this.setState(() => ({
            recentColor: pixels[0]
              ? pixels[pixels.length - 1].colorvalue
              : null,
            recentColorOpacity: pixels[0]
              ? pixels[pixels.length - 1].opacity
              : null
          }));
        });
        getAllEvents();
        axios.get("/api/getRandom").then(quote => {
          this.setState(() => ({
            quote: quote.data,
            Hayden: this.calculate()
          }));
        });
      } else {
        this.props.history.push("/start");
      }
    });
  }

  saveQuote() {
    const { quote } = this.state;
    let text = quote.quote;
    let author = quote.author;
    let tags = quote.cat;
    let ilgi_id = this.props.ilgi.id;
    this.setState({ openSnackbar: true });
    axios.post("/api/quote", { text, author, tags, ilgi_id });
  }
  refresh() {
    axios.get("/api/getRandom").then(quote => {
      this.setState({ quote: quote.data });
    });
  }

  calculate() {
    const { events } = this.props;
    const DayOfYear = events.filter(el => el.date !== null).map(ele => {
      return moment(ele.date, "MM-DD-YYYY").dayOfYear();
    });
    const upComingEvent = Math.min(...DayOfYear);
    const e = events.filter(
      el => moment(el.date, "MM-DD-YYYY").dayOfYear() === upComingEvent
    );
    console.log(e);

    if (events[0])
      return (
        <div key={0} className="Home_upcoming-center">
          <div className="upcoming-mini">
            <h1 className="upcoming-h1">{e[0].title}</h1>
          </div>
          <div className="upcoming-mini-r">
            <h3 className="upcoming-h3">{e[0].date}</h3>
            <p>{e[0].text}</p>
            <p>{e[0].location}</p>
          </div>
        </div>
      );
    else
      return (
        <div className="Home_upcoming-center">
          <h1>No Upcomming Event</h1>
        </div>
      );
  }

  render() {
    const { pixels, user } = this.props;
    console.log(pixels, this.state.recentColor);
    const { recentColor, quote } = this.state;
    const styles = {
      mood: {
        background: recentColor,
        opacity: this.state.recentColorOpacity
      },
      colorBar: {
        background: recentColor
      },
      colorBar2: {
        background: recentColor,
        opacity: "0.7"
      },
      colorBar3: {
        background: recentColor,
        opacity: "0.4"
      },
      text: {
        color: recentColor
      },
      imgBox: {
        width: "300px",
        height: "300px",
        margin: "5px",
        objectFit: "cover"
      }
    };
    const displayGallery =
      pixels.filter(e => e.img !== null).length < 1 ? (
        <h1 style={{ fontWeight: "lighter" }}>
          ! You haven't added any image on your pixel
        </h1>
      ) : (
        pixels.filter(e => e.img !== null).map((el, i) => {
          return i < 9 ? (
            <img
              className="Home_Gallery-img"
              alt="ilgiGallry"
              style={styles.imgBox}
              width="200"
              src={el.img}
              key={i}
            />
          ) : null;
        })
      );
    return (
      <div className="Home">
        <div className="Home_animatedHeader Home_animatedHeader-show">
          <h1 className="Home_animatedHeader_h1">{`Welcome       ${
            user.displayname
          }`}</h1>
        </div>
        <div className="Home_titleHeader_outer">
          <div className="Home_HeaderNav">
            <Link className="Home_HeaderNav-item" to="/ilgi">
              PIXELS
            </Link>
            <Link className="Home_HeaderNav-item" to="/profile">
              PROFILE
            </Link>
            <h1 className="Home_HeaderNav-h1">[ ilgi ]</h1>
            <Link className="Home_HeaderNav-item" to="/graph">
              GRAPH
            </Link>
            <Link className="Home_HeaderNav-item" to="/inbox">
              INBOX
            </Link>
          </div>
          <div className="Home_titleHeader" />
          <p className="Home_titleHeader-p">COLOR YOOUR PIXEL</p>
          <Link className="Home_css_buttonBox" to="/ilgi">
            <div className="Home_css-button">
              <p className="Home_css-button-text">COLOR</p>
              <div className="Home_css-button-inner">
                <div className="reset-skew">
                  <p className="Home_css-button-inner-text">COLOR</p>
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
        <div className="Home_gallery">
          <span className="Home_gallery-tag Home-tag">GALLERY</span>
          <div className="Home_line" />
          <div className="Home_gallery-boxContainer">{displayGallery}</div>
        </div>
        <div className="Home_upcoming">
          <div className="Home_upcoming-r">
            <span className="Home_upcoming-tag Home-tag">
              Your Upcoming<br />
              <span className="Home_stress">Event</span>
            </span>
            {this.state.Hayden}
          </div>
        </div>
        <div className="Home_RecentMood">
          <span className="Home_RecentMood_tag Home-tag">
            Your Most Recent<br />
            <span className="Home_stress">Color</span>
            {recentColor === null ? (
              <div className="recentmood_nocolor">
                <h2>you have no recent color..</h2>
              </div>
            ) : (
              <div style={styles.text}>{recentColor}</div>
            )}
          </span>
          <span className="Home_colorBar-box">
            <div className="Home_colorBar" style={styles.colorBar} />
            <div className="Home_colorBar" style={styles.colorBar2} />
            <div className="Home_colorBar" style={styles.colorBar3} />
          </span>
        </div>
        <div className="Home_Quote">
          <div className="Home_quoteBox">
            <i className="fas fa-quote-left home_dq-r" />
            <p className="Home_quoteBox_quote">{quote.quote}</p>
            <i className="fas fa-quote-right home_dq-l" />
            <p className="Home_quoteBox_author">{`-By  ${quote.author}`}</p>
          </div>
          <FlatButton
            label="Save"
            onClick={() => this.saveQuote()}
            primary={true}
          />
          <FlatButton
            label="Get Another"
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
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ilgi: state.userReducer.ilgi,
    user: state.userReducer.user,
    events: state.eventReducer.events,
    pixels: state.pixelReducer.pixels
  };
}

export default connect(
  mapStateToProps,
  {
    getUser,
    getIlgi,
    getAllPixels,
    getAllEvents
  }
)(Home);
