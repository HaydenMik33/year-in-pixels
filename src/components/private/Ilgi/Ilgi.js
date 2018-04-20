import React, { Component } from "react";
import "./Ilgi.css";
import * as moment from "moment";
import { getAllPixels, updateCurrentPixel } from "../../../ducks/pixelReducer";
import { connect } from "react-redux";
import axios from "axios";
class Ilgi extends Component {
  constructor() {
    super();
    this.state = {
      Ilgi: []
    };
    this.createNewPixelWithEmptyValue = this.createNewPixelWithEmptyValue.bind(
      this
    );
  }

  componentDidMount() {
    const { getAllPixels, user } = this.props;
    axios
      .get(`/api/ilgi/${user.id}`)
      .then(res => {
        if (res.data[0]) {
          this.setState({ Ilgi: res.data[0] });
          getAllPixels(res.data[0].id);
        } else {
          this.props.history.push("/home/start");
        }
      })
      .catch(console.log);
  }

  createNewPixelWithEmptyValue(pixel_unique) {
    const { img, colorValue, text, updateCurrentPixel } = this.props;
    const { Ilgi } = this.state;
    let ilgi_id = Ilgi.id;
    axios
      .post("/api/pixel", { text, img, colorValue, ilgi_id, pixel_unique })
      .then(pixel => {
        updateCurrentPixel(pixel.data);
      })
      .then(() => this.props.history.push("/home/ilgi/edit"))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let now = moment().format("LLLL");
    const whatdateIsToday = moment().date();
    const whatmonth = moment().month();
    const { pixels } = this.props;
    /////////////////////////////////////////////////////
    const test = startNum => {
      let pixelid = startNum;
      let tables = [];
      let howManyDays = moment(
        `2018-0${startNum / 100}`,
        "YYYY-MM"
      ).daysInMonth();
      for (let i = 1; i < howManyDays + 1; i++) {
        let index = pixels.findIndex(el => el.pixel_unique === pixelid + i);
        let pixelStyle = {
          backgroundColor:
            pixels[index] &&
            (pixels[index].colorvalue === "anger"
              ? "#e16161"
              : pixels[index].colorvalue === "excited"
                ? "#fdc513"
                : pixels[index].colorvalue === "love"
                  ? "#ffd1d1"
                  : pixels[index].colorvalue === "sad"
                    ? "#c6c6c8"
                    : pixels[index].colorvalue === "chill"
                      ? "#eafbfa"
                      : pixels[index].colorvalue === "nervous"
                        ? "#94acff"
                        : "transparent")
        };
        tables.push(
          <div
            key={i}
            className="grid-item-custom"
            style={pixelStyle}
            onClick={() => {
              console.log(pixelid + i);
              if (index === -1) {
                this.createNewPixelWithEmptyValue(pixelid + i);
              } else {
                axios
                  .get(`/api/pixel/${pixelid + i}`)
                  .then(pixel => {
                    this.props.updateCurrentPixel(pixel.data);
                  })
                  .then(() => this.props.history.push("/home/ilgi/edit"));
              }
            }}
          />
          // </Link>
        );
      }
      return tables;
    };

    const daysforIndicate = () => {
      let tables = [];
      for (let i = 1; i < 32; i++) {
        tables.push(
          <div key={i} className="daysIndicator">
            {i}
          </div>
        );
      }
      return tables;
    };

    return (
      <div className="Ilgi">
        <h1>{this.state.Ilgi.title}</h1>
        <p>{now}</p>
        <div className="Ilgi_containerBackground">
          <div className="grid-container">
            <div className="grid-item">
              <span className="grid_month">.. </span>
              {daysforIndicate()}
            </div>
            <div className="grid-item">
              <span className="grid_month">JAN</span> {test(100)}
            </div>
            <div className="grid-item">
              <span className="grid_month">FEB</span> {test(200)}
            </div>
            <div className="grid-item">
              <span className="grid_month">MAR</span> {test(300)}
            </div>
            <div className="grid-item">
              <span className="grid_month">APR</span> {test(400)}
            </div>
            <div className="grid-item">
              <span className="grid_month">MAY</span> {test(500)}
            </div>
            <div className="grid-item">
              <span className="grid_month">JUN</span> {test(600)}
            </div>
            <div className="grid-item">
              <span className="grid_month">JUL</span> {test(700)}
            </div>
            <div className="grid-item">
              <span className="grid_month">AUG</span> {test(800)}
            </div>
            <div className="grid-item">
              <span className="grid_month">SEP</span> {test(900)}
            </div>
            <div className="grid-item">
              <span className="grid_month">OCT</span> {test(1000)}
            </div>
            <div className="grid-item">
              <span className="grid_month">NOV</span> {test(1100)}
            </div>
            <div className="grid-item">
              <span className="grid_month">DEC</span> {test(1200)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { pixels, currentPixel } = state.pixelReducer;
  const { user } = state.userReducer;
  return {
    pixels,
    currentPixel,
    user
  };
}
export default connect(mapStateToProps, {
  getAllPixels,
  updateCurrentPixel
})(Ilgi);
