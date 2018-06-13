import React, { Component } from "react";
import "./Quote.css";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import axios from "axios";
class Quote extends Component {
  Qdelete(id) {
    // axios.delete(`/api/quote/${id}`)
  }
  render() {
    const quoteList = this.props.quotes.map((el, i) => {
      return (
        <Paper zDepth={1} key={i} className="Quote_box">
          <div className="Quote_close" onClick={() => this.Qdelete(el.id)} />
          <i className="fas fa-quote-left Quote_left" />
          <p className="Quote_text ">{el.text}</p>
          <i className="fas fa-quote-right Quote_right" />
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
  return { quotes: state.quoteReducer.quotes };
}
export default connect(mapStateToProps)(Quote);
