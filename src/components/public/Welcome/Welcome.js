import React, { Component } from "react";
import "./Welcome.css";
import RaisedButton from "material-ui/RaisedButton";
const Welcome = () => {
  /////use the link below for my logo
  /////https://open.spotify.com/track/6XInw1uowvKHrJZaiFd8sY?si=ZG_Rhxz0SiCV6HSynbhm8w
  return (
    <div className="welcome">
      <div className="welcome_content">
        <h1 className="welcome_Ilgi">Ilgi</h1>
        <span className="welcome_letter">일기</span>
        <span className="welcome_letter">日记</span>
        <span className="welcome_letter">ダイアリー</span>
        <p>
          COLOR YOUR YEAR IN <br />
          <span className="">PIXELS</span>
        </p>
        <a href={process.env.REACT_APP_LOGIN}>
          <button className="welcome_button">GET STARTED</button>
        </a>
      </div>
    </div>
  );
};

export default Welcome;
