import React, { Component } from "react";
import "./Ilgi.css";
import "./ilgi_media.css";
import * as moment from "moment";
import { updateCurrentPixel, getAllPixels } from "../../../ducks/pixelReducer";
import { getIlgi } from "../../../ducks/userReducer";
import { connect } from "react-redux";
import axios from "axios";
class Ilgi extends Component {
  componentDidMount() {
    const { getIlgi, getAllPixels } = this.props;
    getIlgi();
    getAllPixels();
  }

  createNewPixelWithEmptyValue(pixel_unique) {
    const { updateCurrentPixel } = this.props;
    axios.post("/api/pixel", { pixel_unique }).then(res => {
      axios.post("/api/color", { pixel_unique }).then(() =>
        axios
          .get(`/api/pixel/${res.data[0].id}`)
          .then(pixel => {
            console.log(pixel.data);
            updateCurrentPixel(pixel.data[0]);
          })
          .then(() => this.props.history.push("/ilgi/edit"))
          .catch(error => {
            console.log(error);
          })
          .catch(err => console.log(err))
      );
    });
  }

  render() {
    let now = moment().format("MMMM Do YYYY, h:mm:ss a");
    const whatdateIsToday = moment().date();
    const whatmonth = moment().month() + 1;
    const { pixels } = this.props;
    /////////////////////////////////////////////////////
    const test = pixelid => {
      let tables = [];
      let howManyDays = moment(
        `2018-0${pixelid / 100}`,
        "YYYY-MM"
      ).daysInMonth();
      for (let i = 1; i < howManyDays + 1; i++) {
        let index = pixels.findIndex(el => el.pixel_unique === pixelid + i);
        let pixelStyle = {
          opacity: pixels[index] ? pixels[index].opacity : null,
          backgroundColor: pixels[index]
            ? pixels[index].colorvalue
            : "transparent",
          border:
            pixelid + i === whatmonth * 100 + whatdateIsToday
              ? "2px solid rgba(81, 203, 238, 1)"
              : null,
          boxShadow:
            pixelid + i === whatmonth * 100 + whatdateIsToday
              ? "0 0 7px rgba(81, 203, 238, 1)"
              : null
        };
        tables.push(
          <div
            key={i}
            className="grid-item-custom"
            style={pixelStyle}
            onClick={() => {
              console.log(index, pixels[index]);
              if (index === -1) {
                this.createNewPixelWithEmptyValue(pixelid + i);
              } else {
                axios
                  .get(`/api/pixel/${pixels[index].id}`)
                  .then(pixel => {
                    this.props.updateCurrentPixel(pixel.data[0]);
                  })
                  .then(() => this.props.history.push("/ilgi/edit"))
                  .catch(err => console.log(err));
              }
            }}
          />
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
        <div className="Ilgi_header">
          <h1 className="Ilgi_h1">[ ilgi :{this.props.ilgi.title} ]</h1>
          <p className="Ilgi_by">by {this.props.user.displayname}</p>
          <p className="Ilgi_now">{now}</p>
        </div>
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
  const { user, ilgi } = state.userReducer;
  return {
    pixels,
    currentPixel,
    user,
    ilgi
  };
}
export default connect(
  mapStateToProps,
  {
    updateCurrentPixel,
    getAllPixels,
    getIlgi
  }
)(Ilgi);
