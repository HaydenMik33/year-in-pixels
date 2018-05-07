import React, { Component } from "react";
import "./Edit.css";
import { connect } from "react-redux";
import { updatePixel, updateCurrentPixel } from "../../../ducks/pixelReducer";
import { getAllQuote } from "../../../ducks/quoteReducer";
import axios from "axios";
import basic from "./basic.jpg";
import {
  Card,
  CardActions,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Paper from "material-ui/Paper";
import Slider from "material-ui/Slider";
import RaisedButton from "material-ui/RaisedButton";
import DisplayContent from "./DisplayContent/DisplayContent";
import Snackbar from "material-ui/Snackbar";
import annoyed from "./png64px/annoyed.png";
import dizzy from "./png64px/dizzy.png";
import dull from "./png64px/dull.png";
import excited from "./png64px/excited.png";
import frustrated from "./png64px/frustrated.png";
import good from "./png64px/happy.png";
import happy from "./png64px/happy.png";
import hateful from "./png64px/hateful.png";
import heartbroken from "./png64px/heartbroken.png";
import hilarious from "./png64px/hilarious.png";
import love from "./png64px/love.png";
import nervous from "./png64px/nervous.png";
import sad from "./png64px/sad.png";
import sick from "./png64px/sick.png";
import sleepy from "./png64px/sleepy.png";

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      displayContent: true,
      id: null,
      ilgi_id: null,
      quote_id: null,
      text: "",
      colorvalue: "",
      img: "",
      opacity: 0.5,
      divBorder: "1px solid grey",
      colorClicked: false,
      showResult: false,
      showQuotesFromInbox: false,
      keyword: "",
      photos: [],
      quote: {},
      snackbarShow_photo: false,
      snackbarShow_quote: false
    };
    this.colorvalueSelector = this.colorvalueSelector.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.searchPhotos = this.searchPhotos.bind(this);
  }
  componentDidMount() {
    const { currentPixel, getAllQuote } = this.props;
    console.log(currentPixel);
    let p = currentPixel;
    getAllQuote(p.ilgi_id);
    p.quote_id !== null
      ? axios.get(`/api/quote/${p.quote_id}`).then(res => {
          console.log(res.data);
          this.setState({ quote: res.data });
        })
      : null;
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
    const {
      id,
      ilgi_id,
      quote_id,
      text,
      img,
      colorvalue,
      opacity
    } = this.state;
    const { updatePixel, currentPixel } = this.props;
    axios
      .post(`/api/color/${currentPixel.pixel_unique}`, {
        colorvalue,
        opacity,
        ilgi_id
      })
      .then(() => {
        updatePixel(id, text, img, ilgi_id, quote_id).then(() =>
          this.props.history.push("/home/ilgi")
        );
        // this.props.history.push("/home/ilgi");
      });
  }
  off;
  searchPhotos() {
    const { keyword, showResult } = this.state;
    axios.get(`/api/photos/${keyword}`).then(res => {
      this.setState({ photos: res.data.results, showResult: !showResult });
    });
  }
  select(url) {
    this.setState({
      img: url,
      showResult: !this.state.showResult,
      snackbarShow_photo: true
    });
  }
  selectQuote(quote_id, quote) {
    this.setState({
      quote_id: quote_id,
      quote: quote,
      showQuotesFromInbox: false,
      snackbarShow_quote: true
    });
  }
  bringQuotes() {
    this.setState({ showQuotesFromInbox: true });
  }

  render() {
    const { colorvalue, displayContent } = this.state;

    const { currentPixel } = this.props;
    const styles = {
      colorBoxStyle: {
        opacity: this.state.opacity
      },
      colorBoxBorderStyle: {
        border: this.state.divBorder,
        boxShadow: this.state.inputBoxShadow
      },
      Paper: {
        fontFamily: "'Open Sans', sans-serif"
      }
    };
    const { colorBoxStyle, colorBoxBorderStyle } = styles;
    const quote_searchResult = this.props.quotes.map((el, i) => {
      return (
        <Paper
          style={styles.Paper}
          zDepth={1}
          className="Edit_quote_search_result"
          key={i}
          onClick={() => this.selectQuote(el.id, el)}
        >
          <p>{el.text}</p>
          <p>-By {el.author}</p>
        </Paper>
      );
    });
    const displaySearchResult = this.state.photos.map((el, i) => {
      return (
        <Paper
          zDepth={1}
          className="Edit_photo_search_result"
          key={i}
          onClick={() => this.select(el.urls.regular)}
        >
          <img src={el.urls.small} />
        </Paper>
      );
    });

    return (
      <div className="edit">
        {displayContent ? (
          <div>
            <DisplayContent
              currentPixel={currentPixel}
              quote={this.state.quote}
            />
            <CardActions>
              <RaisedButton label="EDIT" onClick={() => this.handleEdit()} />
            </CardActions>
            {/* have this have quote generator by tags keyword or mood and then save into my inbox */}
          </div>
        ) : (
          <Card style={styles.Paper}>
            <CardMedia>
              {this.state.img ? (
                <img src={this.state.img} alt="myImage.jpg" />
              ) : (
                <img src={basic} alt="defaultimage.jpg" />
              )}
            </CardMedia>
            <CardTitle title="Edit your title" subtitle="Color your day" />

            <div className="edit_grid-container">
              <div
                style={colorvalue === " #d92121" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item annoyed"
                  onClick={() => this.colorvalueSelector(" #d92121")}
                  style={colorvalue === " #d92121" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#ff6037" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item dizzy"
                  onClick={() => this.colorvalueSelector("#ff6037")}
                  style={colorvalue === "#ff6037" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#ff3399" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item love"
                  onClick={() => this.colorvalueSelector("#ff3399")}
                  style={colorvalue === "#ff3399" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#fcd705" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item happy"
                  onClick={() => this.colorvalueSelector("#fcd705")}
                  style={colorvalue === "#fcd705" ? colorBoxStyle : null}
                />
              </div>

              <div
                style={colorvalue === "#9dff00" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item excited"
                  onClick={() => this.colorvalueSelector("#9dff00")}
                  style={colorvalue === "#9dff00" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#00ebef" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item good"
                  onClick={() => this.colorvalueSelector("#00ebef")}
                  style={colorvalue === "#00ebef" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#8e03b5" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item frustrated"
                  onClick={() => this.colorvalueSelector("#8e03b5")}
                  style={colorvalue === "#8e03b5" ? colorBoxStyle : null}
                />
              </div>

              <div
                style={colorvalue === "#3c2c4c" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item hateful"
                  onClick={() => this.colorvalueSelector("#3c2c4c")}
                  style={colorvalue === "#3c2c4c" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#4f7f9e" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item heartbroken"
                  onClick={() => this.colorvalueSelector("#4f7f9e")}
                  style={colorvalue === "#4f7f9e" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#4af9b6" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item hilarious"
                  onClick={() => this.colorvalueSelector("#4af9b6")}
                  style={colorvalue === "#4af9b6" ? colorBoxStyle : null}
                />
              </div>

              <div
                style={colorvalue === "#2243b6" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item nervous"
                  onClick={() => this.colorvalueSelector("#2243b6")}
                  style={colorvalue === "#2243b6" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#5dadec" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item sad"
                  onClick={() => this.colorvalueSelector("#5dadec")}
                  style={colorvalue === "#5dadec" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#5e8c31" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item sick"
                  onClick={() => this.colorvalueSelector("#5e8c31")}
                  style={colorvalue === "#5e8c31" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#33cc99" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item sleepy"
                  onClick={() => this.colorvalueSelector("#33cc99")}
                  style={colorvalue === "#33cc99" ? colorBoxStyle : null}
                />
              </div>
              <div
                style={colorvalue === "#bfafb2" ? colorBoxBorderStyle : null}
              >
                <div
                  className="edit_grid-item dull"
                  onClick={() => this.colorvalueSelector("#bfafb2")}
                  style={colorvalue === "#bfafb2" ? colorBoxStyle : null}
                />
              </div>
            </div>
            <div className="edit_grid-container">
              <img src={annoyed} className="emotion_icons" />
              <img src={dizzy} className="emotion_icons" />
              <img src={love} className="emotion_icons" />
              <img src={happy} className="emotion_icons" />
              <img src={excited} className="emotion_icons" />
              <img src={good} className="emotion_icons" />
              <img src={frustrated} className="emotion_icons" />
              <img src={hateful} className="emotion_icons" />
              <img src={heartbroken} className="emotion_icons" />
              <img src={hilarious} className="emotion_icons" />
              <img src={nervous} className="emotion_icons" />
              <img src={sad} className="emotion_icons" />
              <img src={sick} className="emotion_icons" />
              <img src={sleepy} className="emotion_icons" />
              <img src={dull} className="emotion_icons" />
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
            <div className="edit_paper">
              <div className="edit_paper-lines">
                <div className="edit_vl" />
                <div
                  className="edit_paper-text"
                  contentEditable
                  spellCheck="false"
                  onChange={e => this.setState({ text: e.target.value })}
                >
                  {currentPixel.text}
                  jelly beans sweet roll cupcake lollipop. Powder carrot cake
                  toffee brownie. Marshmallow sweet roll donut. Chocolate cake
                  apple pie candy canes tiramisu dragée wafer. Croissant cookie
                  lemon drops tiramisu jelly-o donut. Sweet gummi bears ice
                  cream
                </div>
              </div>
            </div>
            <div>
              {/* <input
                className="edit_textArea"
                onChange={e => this.setState({ text: e.target.value })}
                defaultValue={currentPixel.text}
              /> */}
            </div>
            <Paper zDepth={1} style={styles.Paper}>
              <input
                className="edit_search_img_input"
                onChange={e => this.setState({ keyword: e.target.value })}
                style={styles.Paper}
              />
              <RaisedButton
                label="search"
                onClick={() => this.searchPhotos()}
              />
              {this.state.showResult ? (
                <Paper
                  zDepth={1}
                  className="Edit_photo_search_result_container"
                >
                  {displaySearchResult}
                </Paper>
              ) : null}
            </Paper>
            <Paper style={styles.Paper}>
              <p>You haven't added quotes in this pixel</p>
              <RaisedButton
                label="Change Quote"
                onClick={() => this.bringQuotes()}
              />
              {this.state.showQuotesFromInbox ? (
                <div className="Edit_search_quote_result_container">
                  {quote_searchResult}
                </div>
              ) : null}
            </Paper>
            <CardActions>
              <RaisedButton label="SAVE" onClick={() => this.handleSave()} />
            </CardActions>
            <Snackbar
              className="Edit_snackBar"
              open={this.state.snackbarShow_photo}
              message="Your pixel photo just changed!"
              autoHideDuration={4000}
              onRequestClose={() =>
                this.setState({ snackbarShow_photo: false })
              }
            />
            <Snackbar
              className="Edit_snackBar"
              open={this.state.snackbarShow_quote}
              message="Quote just added in this pixel"
              autoHideDuration={4000}
              onRequestClose={() =>
                this.setState({ snackbarShow_quote: false })
              }
            />
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPixel: state.pixelReducer.currentPixel,
    quotes: state.quoteReducer.quotes
  };
}
export default connect(mapStateToProps, {
  updatePixel,
  updateCurrentPixel,
  getAllQuote
})(Edit);
