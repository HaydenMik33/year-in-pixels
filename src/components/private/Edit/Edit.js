import React, { Component } from "react";
import "./Edit.css";
import { connect } from "react-redux";
import { updatePixel, updateCurrentPixel } from "../../../ducks/pixelReducer";
import axios from "axios";

class Edit extends Component {
  constructor() {
    super();
    this.refs = {
      love: React.createRef()
    };
    this.state = {
      id: "",
      ilgi_id: "",
      text: "",
      colorValue: "",
      img: "",
      savedText: "How was your day",
      savedImgUrl: "Img url",
      readonly: true,
      clicked: 0,
      divBorder: "1px solid grey",
      inputBorder: "none",
      inputBoxShadow: "none"
    };
    this.colorValueSelector = this.colorValueSelector.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    const { currentPixel } = this.props;
    this.setState({
      id: currentPixel[0].id,
      ilgi_id: currentPixel[0].ilgi_id,
      text: currentPixel[0].text,
      img: currentPixel[0].img
      // colorValue: currentPixel[0].colorvalue
    });
    this.colorValueSelector(currentPixel[0].colorvalue);
  }
  colorValueSelector(ref) {
    this.setState({
      colorValue: ref,
      divBorder: "2px solid rgba(81, 203, 238, 1)",
      inputBoxShadow: "0 0 7px rgba(81, 203, 238, 1)"
    });
  }
  reset() {
    this.setState({
      text: "",
      img: "",
      colorValue: ""
    });
  }
  handleConfirm() {
    const { id, ilgi_id, text, img, colorValue } = this.state;
    const { updateCurrentPixel, updatePixel } = this.props;
    updateCurrentPixel([{ text, img, colorValue }]);
    updatePixel(id, text, img, colorValue, ilgi_id);
    this.props.history.push("/home/ilgi");
  }

  render() {
    const {
      text,
      img,
      readonly,
      clicked,
      savedImgUrl,
      savedText,
      colorValue
    } = this.state;
    const { currentPixel } = this.props;
    const styles = {
      inputStyle: {
        border: this.state.inputBorder
      },
      colorBoxStyle: {
        border: this.state.divBorder,
        boxShadow: this.state.inputBoxShadow
      }
    };
    const { colorBoxStyle, inputStyle } = styles;
    return (
      <div className="edit">
        <p>double click to edit your Ilgi</p>
        <div className="edit_grid-container">
          <div
            className="edit_grid-item #e16161 anger"
            onClick={() => this.colorValueSelector("anger")}
            style={colorValue === "anger" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #fdc513 excited"
            onClick={() => this.colorValueSelector("excited")}
            style={colorValue === "excited" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #ffd1d1 love"
            onClick={() => this.colorValueSelector("love")}
            style={colorValue === "love" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #c6c6c8 sad"
            onClick={() => this.colorValueSelector("sad")}
            style={colorValue === "sad" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item #eafbfa chill"
            onClick={() => this.colorValueSelector("chill")}
            style={colorValue === "chill" ? colorBoxStyle : null}
          />
          <div
            className="edit_grid-item 	#94acff nervous"
            onClick={() => this.colorValueSelector("nervous")}
            style={colorValue === "nervous" ? colorBoxStyle : null}
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
          defaultValue={
            currentPixel[0].img !== null ? currentPixel[0].img : savedImgUrl
          }
        />
        {currentPixel[0].img ? (
          <div>
            <img src={currentPixel[0].img} alt="image.jpg" />
          </div>
        ) : null}

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
          defaultValue={
            currentPixel[0].text !== null ? currentPixel[0].text : savedText
          }
        />

        <button onClick={() => this.handleConfirm()}>Confirm</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPixel: state.pixelReducer.currentPixel
  };
}
export default connect(mapStateToProps, {
  updatePixel,
  updateCurrentPixel
})(Edit);
