import React, { Component } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="Intro_content_box">
          <h1 className="welcome_Ilgi">Ilgi</h1>
          <span className="letter">일기</span>
          <span className="letter">日记</span>
          <span className="letter">ダイアリー</span>
          <p>
            COLOR YOUR YEAR IN <br />
            <span>PIXELS</span>
          </p>
          <a href={process.env.REACT_APP_LOGIN}>
            <button>GET STARTED</button>
          </a>
        </div>
      </div>
    );
  }
}

export default Welcome;
