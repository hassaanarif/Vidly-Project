import React, { Component } from "react";

class Like extends Component {
  render() {
    let icon = "fa fa-heart";
    if (!this.props.liked) {
      icon += "-o";
    }
    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onLikeToggle}
        className={icon}
      ></i>
    );
  }
}

export default Like;
