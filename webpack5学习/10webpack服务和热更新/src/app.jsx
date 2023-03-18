import React, { Component } from "react";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"hell1o1212"
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    )
  }
}

