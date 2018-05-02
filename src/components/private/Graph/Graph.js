import React, { Component } from "react";
import "./Graph.css";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { isString } from "util";
const yearIcon = <FontIcon className="material-icons">By year</FontIcon>;
const monthIcon = <FontIcon className="material-icons">By month</FontIcon>;
const colorIcon = <FontIcon className="material-icons">By color</FontIcon>;

class Graph extends Component {
  state = {
    selectedIndex: 0
  };

  select = index => this.setState({ selectedIndex: index });

  componentDidMount() {}
  render() {
    console.log(this.props.pixels);
    const PcolorArr = ["#fdc513", "#ffd1d1"];
    const NcolorArr = ["#e60000", "#c6c6c8", "#eafbfa", "#94acff"];
    const check_yValue = (colorvalue, opacity) => {
      let yValue = "";
      if (PcolorArr.indexOf(colorvalue) !== -1) {
        yValue = `${22.5 * (opacity * 10)}`;
        return yValue;
      } else if (NcolorArr.indexOf(colorvalue) !== -1) {
        yValue = `${225 + 22.5 * (opacity * 10)}`;
        return yValue;
      }
    };
    const check_xValue = pixel_unique => {
      let xValue = "";
      pixel_unique < 150
        ? (xValue = "52.8")
        : pixel_unique > 150 && pixel_unique < 250
          ? (xValue = `${52.8 * 2}`)
          : pixel_unique > 250 && pixel_unique < 350
            ? (xValue = `${52.8 * 3}`)
            : pixel_unique > 350 && pixel_unique < 450
              ? (xValue = `${52.8 * 4}`)
              : pixel_unique > 450 && pixel_unique < 550
                ? (xValue = `${52.8 * 5}`)
                : pixel_unique > 550 && pixel_unique < 650
                  ? (xValue = `${52.8 * 6}`)
                  : pixel_unique > 650 && pixel_unique < 750
                    ? (xValue = `${52.8 * 7}`)
                    : pixel_unique > 750 && pixel_unique < 850
                      ? (xValue = `${52.8 * 8}`)
                      : pixel_unique > 850 && pixel_unique < 950
                        ? (xValue = `${52.8 * 9}`)
                        : pixel_unique > 950 && pixel_unique < 1050
                          ? (xValue = `${52.8 * 10}`)
                          : pixel_unique > 1050 && pixel_unique < 1150
                            ? (xValue = `${52.8 * 11}`)
                            : pixel_unique > 1150
                              ? (xValue = `${52.8 * 12}`)
                              : null;
      return xValue;
    };
    const point = this.props.pixels.map((pixel, i) => {
      return (
        <circle
          key={i}
          fill="#eef5ee"
          cx={check_xValue(pixel.pixel_unique)}
          cy={check_yValue(pixel.colorvalue, pixel.opacity)}
          r="4"
        />
      );
    });
    const line = this.props.pixels.map((pixel, i, pixels) => {
      return (
        <line
          key={i}
          fill="none"
          stroke="#b5d1f1"
          strokeWidth="2"
          x1={check_xValue(pixel.pixel_unique)}
          y1={check_yValue(pixel.colorvalue, pixel.opacity)}
          x2={
            i === pixels.length - 1
              ? check_xValue(pixel.pixel_unique)
              : check_xValue(pixels[i + 1].pixel_unique)
          }
          y2={
            i === pixels.length - 1
              ? check_yValue(pixel.colorvalue, pixel.opacity)
              : check_yValue(pixels[i + 1].colorvalue, pixels[i + 1].opacity)
          }
        />
      );
    });
    const pixels = this.props.pixels.map((pixel, i) => {
      return (
        <div key={i}>
          pixel unique => {pixel.pixel_unique}
          color Value => {pixel.colorvalue}
          color opacity=>{pixel.opacity}
        </div>
      );
    });
    return (
      <div className="Graph">
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              icon={yearIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              icon={monthIcon}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              icon={colorIcon}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </Paper>
        {this.state.selectedIndex === 0 ? (
          <div className="Graph_year">
            <div>
              <svg fill="#244769" viewBox="0 0 741 450">
                {line}
                <g>{point}</g>
              </svg>
            </div>
            <Paper zDepth={2}>
              Information Tracker (for developer)
              {pixels}
            </Paper>
          </div>
        ) : this.state.selectedIndex === 1 ? (
          <div> second one</div>
        ) : this.state.selectedIndex === 2 ? (
          <div>third one</div>
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.pixelReducer
  };
}
export default connect(mapStateToProps)(Graph);
