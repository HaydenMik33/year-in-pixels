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

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      displayContent: true,
      id: "",
      ilgi_id: "",
      quote_id: "",
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
      .post(`/api/color/${currentPixel.pixel_unique}`, { colorvalue, opacity })
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
      }
    };
    const { colorBoxStyle, colorBoxBorderStyle } = styles;
    const quote_searchResult = this.props.quotes.map((el, i) => {
      return (
        <Paper
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
          <Card>
            <CardMedia>
              {this.state.img ? (
                <img src={this.state.img} alt="myImage.jpg" />
              ) : (
                <img src={basic} alt="defaultimage.jpg" />
              )}
            </CardMedia>
            <CardTitle title="name you pixel" subtitle="Card subtitle" />
            <CardText>
              <input
                className="edit_textArea"
                onChange={e => this.setState({ text: e.target.value })}
                defaultValue={currentPixel.text}
              />
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
            <Paper zDepth={1}>
              <input
                className="edit_search_img_input"
                defaultValue="type keywords to search up images"
                onChange={e => this.setState({ keyword: e.target.value })}
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
            <Paper>
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
