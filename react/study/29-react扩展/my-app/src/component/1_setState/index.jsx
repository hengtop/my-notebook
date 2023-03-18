import React, { Component } from 'react'

export default class Demo extends Component {
  state = {
    count:0
  }
  add = () => {
  /*   const {count} = this.state;
    this.setState({count:count+1}, () => {
      console.log("改变了");
    }); */
    //函数式setState
    this.setState((state, props) => {
      console.log(state, props);
      return {count: state.count+1}
    },() => {
      console.log("改变完了~~~~~");
    });
  }
  render() {
    return (
      <div>
        demo.....
        <h2>{this.state.count}</h2>
        <button onClick={this.add}>点我加一</button>
      </div>
    )
  }
}
