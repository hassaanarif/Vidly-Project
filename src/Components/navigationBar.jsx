import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="NavBar">
        NAVBAR{" "}
        <span
          style={{
            backgroundColor: "grey",
            borderRadius: "2px",
            paddingLeft: "2px",
            paddingRight: "2px",
            color: "black",
          }}
        >
          {this.props.totalCounters}
        </span>
      </div>
    );
  }
}

export default NavBar;
