import React, { Component } from "react";
import { CardHeader, CardMedia } from "material-ui/Card";
import basic from "../basic.jpg";
import moment from "moment";
import "./DisplayContent.css";
import { connect } from "react-redux";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";
class DisplayContent extends Component {
  state = {
    Hayden: function() {
      return (
        <div>
          <h1>
            No Event <br />in this pixel
          </h1>
          <Link to="/inbox/addEvent/200">
            <FlatButton label="Add One" secondary={true} />
          </Link>
        </div>
      );
    }
  };

  componentDidMount() {
    console.log(this.props);
    const { currentPixel } = this.props;
    const isItTrue = function(el) {
      return el.pixel_unique === currentPixel.pixel_unique;
    };
    this.props.events.some(el => isItTrue(el))
      ? this.setState({ Hayden: this.calculate })
      : null;
  }
  calculate = () => {
    const { currentPixel } = this.props;
    const displayEvent = this.props.events
      .filter(el => el.pixel_unique === currentPixel.pixel_unique)
      .map((el, i) => {
        console.log(el);
        return (
          <div className="DisplayContent_Event-content" key={i}>
            <Link to="/inbox/addEvent">
              <i className="far fa-edit" />
            </Link>
            <h1>{el.title}</h1>
            <p>{el.date}</p>
            <p>{el.location}</p> <p>{el.text}</p>
          </div>
        );
      });
    return displayEvent;
  };
  render() {
    const { currentPixel } = this.props;
    console.log(this.props.events, currentPixel);
    let month = "";
    let p_u = currentPixel.pixel_unique;
    const Parr = p_u.toString().split("");
    const convertmonth = () => {
      Parr.length > 3
        ? (month = Parr.slice(0, 2).join(""))
        : (month = Parr.slice(0, 1).join(""));
    };

    convertmonth();
    const date = p_u - month * 100;
    const dayName = moment(
      `2018-${month.length === 2 ? month : `0${month}`}-${
        date.length === 2 ? date : `0${date}`
      }`
    ).format("dddd");
    const styles = {
      Paper: {
        fontFamily: "'Open Sans', sans-serif"
      },
      CardHeader: {
        fontFamily: "'Open Sans', sans-serif",
        fontSize: "36px"
      },
      image: {
        height: "600px",
        objectFit: "contain"
      },
      Haydenbox: {
        background: this.props.currentPixel.colorvalue,
        opacity: this.props.currentPixel.opacity
      }
    };

    return (
      <div className="DisplayContent">
        <div style={styles.Paper} className="DisplayContent_body">
          <div className="DisplayContent_first">
            <CardMedia>
              {currentPixel.img ? (
                <img
                  src={currentPixel.img}
                  style={styles.image}
                  alt="myImage.jpg"
                />
              ) : (
                <img src={basic} alt="defaultimage.jpg" />
              )}
            </CardMedia>
            <div className="Haydenhaha">
              <h1>
                You are in the mood of "
                <div className="HaydenBox" style={styles.Haydenbox} />
                "
              </h1>
            </div>
          </div>
          <div className="DisplayContent_second">
            <div className="DisplayContent_left">
              <div className="DisplayContent_paper">
                <div className="DisplayContent_paper-lines">
                  <div className="vl" />
                  <div className="DisplayContent_paper-text">
                    <CardHeader
                      title={`${month}月 ${date}日 2018`}
                      subtitle={dayName}
                      style={styles.CardHeader}
                      avatar="https://thumbs.dreamstime.com/b/pixel-art-style-rainbow-homosexual-heart-sign-71899821.jpg"
                    />
                    {currentPixel.text}
                  </div>
                </div>
              </div>
            </div>
            <div className="DisplayContent_right">
              <div style={styles.Paper} className="DisplayContent_Quote">
                <i className="fas fa-quote-left" />
                <p className="DisplayContent_Quote-quote">
                  {this.props.quote[0]
                    ? this.props.quote[0].text
                    : "You haven't added any quote in this pixel"}
                </p>
                <i className="fas fa-quote-right" />
                <p>
                  {this.props.quote[0]
                    ? `-By ${this.props.quote[0].author}`
                    : null}
                </p>
              </div>

              <div style={styles.Paper} className="DisplayContent_Event">
                {this.state.Hayden()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    events: state.eventReducer.events
  };
}
export default connect(mapStateToProps)(DisplayContent);
