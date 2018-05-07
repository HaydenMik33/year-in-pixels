import React from "react";
import "./Gallery.css";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
const Gallery = props => {
  console.log(props.pixels);
  const styles = {
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  };
  const photosList = props.pixels.map((el, i) => {
    return el.img ? (
      <Paper zDepth={1} key={i} className="Gallery_box">
        <img src={el.img} style={styles.image} />
      </Paper>
    ) : null;
  });
  return (
    <div className="Gallery">
      <div className="Gallery_display">{photosList}</div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    pixels: state.pixelReducer.pixels
  };
}
export default connect(mapStateToProps)(Gallery);
