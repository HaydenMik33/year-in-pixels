import React, { Component } from "react";
import "./Edit.css";
import { connect } from "react-redux";
import { updatePixel, updateCurrentPixel } from "../../../ducks/pixelReducer";
import axios from "axios";
import basic from "./basic.jpg";
import heart from "./heart.png";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Slider from "material-ui/Slider";
import RaisedButton from "material-ui/RaisedButton";
import DisplayContent from "./DisplayContent/DisplayContent";

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      displayContent: true,
      id: "",
      ilgi_id: "",
      text: "",
      colorvalue: "",
      img: "",
      savedText: "How was your day",
      savedImgUrl: "Img url",
      opacity: 0.5,
      divBorder: "1px solid grey",
      colorClicked: false
    };
    this.colorvalueSelector = this.colorvalueSelector.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    const { currentPixel } = this.props;
    console.log(currentPixel);
    let p = currentPixel;
    this.setState({
      id: p.id,
      ilgi_id: p.ilgi_id,
      text: p.text,
      img: p.img,
      opacity: p.opacity
    });
    this.colorvalueSelector(p.colorvalue);
  }
  colorvalueSelector(colorvalue) {
    this.setState({
      colorvalue: colorvalue,
      divBorder: "2px solid rgba(81, 203, 238, 1)",
      inputBoxShadow: "0 0 7px rgba(81, 203, 238, 1)",
      colorClicked: true
    });
  }
  handleEdit() {
    this.setState({ displayContent: !this.state.displayContent });
  }
  handleSave() {
    const { id, ilgi_id, text, img, colorvalue, opacity } = this.state;
    const { updatePixel, currentPixel } = this.props;
    axios
      .post(`/api/color/${currentPixel.pixel_unique}`, { colorvalue, opacity })
      .then(() => {
        updatePixel(id, text, img, ilgi_id).then(() =>
          this.props.history.push("/home/ilgi")
        );
        // this.props.history.push("/home/ilgi");
      });
  }

  render() {
    const {
      text,
      img,
      savedImgUrl,
      savedText,
      colorvalue,
      displayContent
    } = this.state;

    const { currentPixel } = this.props;
    const styles = {
      colorBoxStyle: {
        opacity: this.state.opacity
      },
      colorBoxBorderStyle: {
        border: this.state.divBorder,
        boxShadow: this.state.inputBoxShadow
      }
    };
    const { colorBoxStyle, colorBoxBorderStyle } = styles;

    return (
      <div className="edit">
        {displayContent ? (
          <div>
            <DisplayContent currentPixel={currentPixel} />
            <CardActions>
              <RaisedButton label="EDIT" onClick={() => this.handleEdit()} />
            </CardActions>
            {/* have this have quote generator by tags keyword or mood and then save into my inbox */}
          </div>
        ) : (
          <Card className="card">
            <CardMedia
              overlay={<CardTitle title="wheather icon" subtitle="weather" />}
            >
              {currentPixel.img ? (
                <img src={currentPixel.img} alt="image.jpg" />
              ) : (
                <img src={basic} alt="defaultimage.jpg" />
              )}
            </CardMedia>
            <CardTitle title="name you pixel" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
              vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
              pellentesque. Aliquam dui mauris, mattis quis lacus id,
              pellentesque lobortis odio.
            </CardText>;
            <div className="edit_grid-container">
              <div
                style={colorvalue === "#e60000" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item anger"
                  onClick={() => this.colorvalueSelector("#e60000")}
                  style={colorvalue === "#e60000" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#fdc513" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item excited"
                  onClick={() => this.colorvalueSelector("#fdc513")}
                  style={colorvalue === "#fdc513" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#ffd1d1" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item love"
                  onClick={() => this.colorvalueSelector("#ffd1d1")}
                  style={colorvalue === "#ffd1d1" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#c6c6c8" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item sad"
                  onClick={() => this.colorvalueSelector("#c6c6c8")}
                  style={colorvalue === "#c6c6c8" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#eafbfa" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item  chill"
                  onClick={() => this.colorvalueSelector("#eafbfa")}
                  style={colorvalue === "#eafbfa" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#94acff" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item nervous"
                  onClick={() => this.colorvalueSelector("#94acff")}
                  style={colorvalue === "#94acff" ? colorBoxStyle : null}
                />
              </div>
              <div className="edit_grid-item" />
              <div className="edit_grid-item" />
              <div className="edit_grid-item" />
              <div className="edit_grid-item" />
              <div className="edit_grid-item" />
              <div className="edit_grid-item" />
            </div>
            {this.state.colorClicked ? (
              <Slider
                className="edit_slider"
                min={0.1}
                max={1.0}
                step={0.1}
                defaultValue={0.5}
                value={this.state.opacity}
                onChange={(e, value) => this.setState({ opacity: value })}
              />
            ) : null}
            <input
              className="edit_input"
              onChange={e =>
                this.setState({
                  img: e.target.value
                })
              }
              defaultValue={
                currentPixel.img !== null ? currentPixel.img : savedImgUrl
              }
            />
            <input
              className="edit_textArea edit_input"
              onChange={e => this.setState({ text: e.target.value })}
              onClick={() => {
                this.setState({
                  inputBorder: "1px solid grey"
                });
              }}
              defaultValue={
                currentPixel.text !== null ? currentPixel.text : savedText
              }
            />
            <CardActions>
              <RaisedButton label="SAVE" onClick={() => this.handleSave()} />
            </CardActions>
          </Card>
        )}
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
