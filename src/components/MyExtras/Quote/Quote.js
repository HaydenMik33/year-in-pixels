import React from "react";
import "./Quote.css";
import Paper from "material-ui/Paper";

const Quote = props => {
  console.log(props);

  const quoteList = props.quotes.map((el, i) => {
    return (
      <Paper zDepth={1} key={i} className="Quote_box">
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
};

export default Quote;
