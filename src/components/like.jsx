import React, { Component } from "react";

class Like extends Component {
  state = {};
  render() {
    const classe = this.props.like ? "fa fa-heart" : "fa fa-heart-o";
    return <i onClick={this.props.onClick} className={classe} />;
  }
}

export default Like;
