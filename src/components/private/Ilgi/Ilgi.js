import React, { Component } from "react";
import "./Ilgi.css";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Ilgi extends Component {
  constructor() {
    super();
    this.state = {};
    this.linkToEditWithId = this.linkToEditWithId.bind(this);
  }
  linkToEditWithId(pixelid) {}

  render() {
    let now = moment().format("LLLL");
    const whatdateIsToday = moment().date();
    const whatmonth = moment().month();
    const test = startNum => {
      var tables = [];
      var howManyDays = moment(
        `2018-0${startNum / 10}`,
        "YYYY-MM"
      ).daysInMonth();
      for (var i = 1; i < howManyDays + 1; i++) {
        var pixelid = startNum;
        tables.push(
          <Link to="/home/edit" key={i}>
            <div
              key={i}
              className="grid-item-custom"
              onClick={this.linkToEditWithId(pixelid + 1)}
            />
          </Link>
        );
      }
      return tables;
    };

    const daysforIndicate = () => {
      var tables = [];
      for (var i = 1; i < 32; i++) {
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
        <p>This is my Ilgi table</p>
        <p>{now}</p>
        <div className="Ilgi_containerBackground">
          <div className="grid-container">
            <div className="grid-item">
              <span className="grid_month">.. </span>
              {daysforIndicate()}
            </div>
            <div className="grid-item">
              <span className="grid_month">JAN</span> {test(10)}
            </div>
            <div className="grid-item">
              <span className="grid_month">FEB</span> {test(20)}
            </div>
            <div className="grid-item">
              <span className="grid_month">MAR</span> {test(30)}
            </div>
            <div className="grid-item">
              <span className="grid_month">APR</span> {test(40)}
            </div>
            <div className="grid-item">
              <span className="grid_month">MAY</span> {test(50)}
            </div>
            <div className="grid-item">
              <span className="grid_month">JUN</span> {test(60)}
            </div>
            <div className="grid-item">
              <span className="grid_month">JUL</span> {test(70)}
            </div>
            <div className="grid-item">
              <span className="grid_month">AUG</span> {test(80)}
            </div>
            <div className="grid-item">
              <span className="grid_month">SEP</span> {test(90)}
            </div>
            <div className="grid-item">
              <span className="grid_month">OCT</span> {test(100)}
            </div>
            <div className="grid-item">
              <span className="grid_month">NOV</span> {test(110)}
            </div>
            <div className="grid-item">
              <span className="grid_month">DEC</span> {test(120)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ilgi;
