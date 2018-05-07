import React, { Component } from "react";
import "./Quote.css";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import { getAllQuote } from "../../../ducks/quoteReducer";
import axios from "axios";
class Quote extends Component {
  Qdelete(id) {
    axios.delete(`/api/quote/${id}`).then(() => {
      this.props.getAllQuote(this.props.ilgi.id);
    });
  }
  render() {
    const quoteList = this.props.quotes.map((el, i) => {
      return (
        <Paper zDepth={1} key={i} className="Quote_box">
          <div className="Quote_close" onClick={() => this.Qdelete(el.id)} />
          <span className="Quote_doubleQ">" </span>
          <p className="Quote_text">{el.text}</p>
          <span className="Quote_doubleQ"> "</span>
          <p className="Quote_by">-By {el.author}</p>
          <p className="Quote_tag"># {el.tags}</p>
        </Paper>
      );
    });
    return (
      <div className="Quote">
        {/* get quote by tags use mui chips */}
        <div className="Quote_display">{quoteList}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ilgi: state.pixelReducer.ilgi
  };
}
export default connect(mapStateToProps, { getAllQuote })(Quote);
