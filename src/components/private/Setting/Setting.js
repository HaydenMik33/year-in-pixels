import React, { Component } from "react";
import "./Setting.css";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import Toggle from "material-ui/Toggle";
import { connect } from "react-redux";
import axios from "axios";
import Profile from "../Profile/Profile";
class Setting extends Component {
  deleteIlgi() {
    axios.delete(`/api/ilgi`).then(() => {
      this.props.history.push("/home");
    });
  }
  render() {
    const styles = {
      root: {
        display: "flex",
        flexDirection: "column"
      },
      p: {
        display: "block",
        background: "grey",
        opacity: "0.8",
        fontFamily: "'Open Sans',sans-serif",
        fontSize: "36px",
        height: "30px",
        padding: "20px"
      }
    };
    console.log(this.props);
    return (
      <div style={styles.root}>
        <List>
          <ListItem
            primaryText="Profile photo"
            secondaryText="Change your Google+ profile photo"
          />
          <ListItem>
            <Profile />
          </ListItem>
        </List>
        <Divider />

        <Divider />
        <List>
          <ListItem>
            <p
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you wish to delete your whole Ilgi for this year?"
                  )
                )
                  this.deleteIlgi();
              }}
              style={styles.p}
            >
              Delete 2018 Ilgi
            </p>
          </ListItem>
        </List>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ilgi: state.pixelReducer.ilgi
  };
}
export default connect(mapStateToProps)(Setting);
