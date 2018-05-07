import React, { Component } from "react";
import "./Graph.css";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import FontIcon from "material-ui/FontIcon";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
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
    const months = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: []
    };
    let avgYValue = 0;
    const assignMonth = () => {
      this.props.pixels.map(pixel => {
        if (pixel.colorvalue) {
          let p = pixel.pixel_unique;
          p < 150
            ? months[1].push(pixel)
            : p > 150 && p < 250
              ? months[2].push(pixel)
              : p > 250 && p < 350
                ? months[3].push(pixel)
                : p > 350 && p < 450
                  ? months[4].push(pixel)
                  : p > 450 && p < 550
                    ? months[5].push(pixel)
                    : p > 550 && p < 650
                      ? months[6].push(pixel)
                      : p > 650 && p < 750
                        ? months[7].push(pixel)
                        : p > 750 && p < 850
                          ? months[8].push(pixel)
                          : p > 850 && p < 950
                            ? months[9].push(pixel)
                            : p > 950 && p < 1050
                              ? months[10].push(pixel)
                              : p > 1050 && p < 1150
                                ? months[11].push(pixel)
                                : p > 1150 && p < 1250
                                  ? months[12].push(pixel)
                                  : null;
        } else {
          null;
        }
      });
    };
    const generateCircle = () => {
      assignMonth();
      let sumOfYvalue = 0;
      let curY = 0;
      let sum = 0;
      for (let key in months) {
        sumOfYvalue = months[key].map((el, i) => {
          let curY = check_yValue(el.colorvalue, el.opacity);
          sum += Number(curY);
          console.log(sum);
          return sum;
        });
        console.log(sumOfYvalue, months[key].length);
        return (
          <circle
            key={key}
            fill="#eef5ee"
            cx={`${52.8 * key}`}
            cy={`${sumOfYvalue[sumOfYvalue.length - 1] / months[key].length}`}
            r="4"
          />
        );
      }
    };
    // const generateLine = () =>

    // const line = this.props.pixels.map((pixel, i, pixels) => {
    //   return (
    //     <line
    //       key={i}
    //       fill="none"
    //       stroke="#b5d1f1"
    //       strokeWidth="2"
    //       x1={check_xValue(pixel.pixel_unique)}
    //       y1={check_yValue(pixel.colorvalue, pixel.opacity)}
    //       x2={
    //         i === pixels.length - 1
    //           ? check_xValue(pixel.pixel_unique)
    //           : check_xValue(pixels[i + 1].pixel_unique)
    //       }
    //       y2={
    //         i === pixels.length - 1
    //           ? check_yValue(pixel.colorvalue, pixel.opacity)
    //           : check_yValue(pixels[i + 1].colorvalue, pixels[i + 1].opacity)
    //       }
    //     />
    //   );
    // });
    const pixels = this.props.pixels.map((pixel, i) => {
      return (
        <div key={i}>
          pixel unique => {pixel.pixel_unique}
          color Value => {pixel.colorvalue}
          color opacity=>{pixel.opacity}
        </div>
      );
    });
    const styles = {
      Paper: {
        fontFamily: "'Open Sans', sans-serif"
      }
    };
    return (
      <div className="Graph">
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              icon={yearIcon}
              onClick={() => this.select(0)}
              style={styles.Paper}
            />
            <BottomNavigationItem
              icon={monthIcon}
              onClick={() => this.select(1)}
              style={styles.Paper}
            />
            <BottomNavigationItem
              icon={colorIcon}
              onClick={() => this.select(2)}
              style={styles.Paper}
            />
          </BottomNavigation>
        </Paper>
        {this.state.selectedIndex === 0 ? (
          <div className="Graph_year">
            <div>
              <svg fill="#244769" viewBox="0 0 741 450">
                {/* {line} */}
                <g>{generateCircle()}</g>
              </svg>
            </div>
            <Paper zDepth={2} style={styles.Paper}>
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
