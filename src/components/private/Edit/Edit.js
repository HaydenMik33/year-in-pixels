import React, { Component } from "react";
import "./Edit.css";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor() {
    super();
    this.refs = {
      love: React.createRef()
    };
    this.state = {
      text: "",
      mood: "",
      img: "",
      savedText: "How was your day",
      savedImgUrl: "Img url",
      readonly: true,
      clicked: 0,
      divBorder: "1px solid grey",
      inputBorder: "none",
      inputBoxShadow: "none"
    };
    this.moodSelector = this.moodSelector.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  moodSelector(ref) {
    this.setState({
      mood: ref,
      divBorder: "2px solid rgba(81, 203, 238, 1)",
      inputBoxShadow: "0 0 7px rgba(81, 203, 238, 1)"
    });
  }

  handleConfirm() {}

  render() {
    console.log(this.state.mood);
    const {
      text,
      img,
      readonly,
      clicked,
      savedImgUrl,
      savedText,
      mood
    } = this.state;
    const styles = {
      inputStyle: {
        border: this.state.inputBorder
      },
      colorBoxStyle: {
        border: this.state.divBorder,
        "box-shadow": this.state.inputBoxShadow
      }
    };
    const { colorBoxStyle, inputStyle } = styles;
    return (
      <div className="edit">
        <p>double click to edit your Ilgi</p>
        <div className="edit_grid-container">
          <div
            className="edit_grid-item #e16161 anger"
            onClick={() => this.moodSelector("anger")}
            style={mood === "anger" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #fdc513 excited"
            onClick={() => this.moodSelector("excited")}
            style={mood === "excited" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #ffd1d1 love"
            onClick={() => this.moodSelector("love")}
            style={mood === "love" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #c6c6c8 sad"
            onClick={() => this.moodSelector("sad")}
            style={mood === "sad" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #eafbfa chill"
            onClick={() => this.moodSelector("chill")}
            style={mood === "chill" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item 	#94acff nervous"
            onClick={() => this.moodSelector("nervous")}
            style={mood === "nervous" ? colorBoxStyle : null}
          />
          <div className="edit_grid-item" />
          <div className="edit_grid-item" />
          <div className="edit_grid-item" />
          <div className="edit_grid-item" />
          <div className="edit_grid-item" />
          <div className="edit_grid-item" />
        </div>
        <input
          className="edit_input"
          onChange={e =>
            this.setState({
              img: e.target.value
            })
          }
          defaultValue={savedImgUrl}
        />

        <input
          className="edit_textArea edit_input"
          readOnly={readonly}
          style={inputStyle}
          onChange={e => this.setState({ text: e.target.value })}
          onClick={() => {
            this.setState({
              clicked: clicked + 1
            });
            clicked === 2
              ? this.setState({
                  readonly: !readonly,
                  clicked: 0,
                  inputBorder: "1px solid grey"
                })
              : null;
          }}
          defaultValue={savedText}
        />
        <Link to="/home/ilgi">
          <button onClick={this.handleConfirm}>Confirm</button>
        </Link>
      </div>
    );
  }
}

export default Edit;
