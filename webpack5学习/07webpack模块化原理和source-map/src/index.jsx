import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'core-js/stable'; 
import 'regenerator-runtime/runtime';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"hello"
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

ReactDOM.render(<App />, document.getElementById("app"));