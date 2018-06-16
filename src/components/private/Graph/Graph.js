import React, { Component } from "react";
import "./Graph.css";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

class Graph extends Component {
  render() {
    console.log(this.props.pixels);
    const dataForYear = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "By months",
          fill: false,
          lineTension: 0.4,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    return (
      <div className="Graph">
        <Line data={dataForYear} />
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
