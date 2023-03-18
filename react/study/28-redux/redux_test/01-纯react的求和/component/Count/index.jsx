import React, { Component } from 'react'

export default class Count extends Component {
  state = {
    count: 0
  }
  increment = () => {
    const { value } = this.selectNum;
    const { count } = this.state;
    this.setState({ count: count + (+value) });
  }
  decrement = () => {
    const { value } = this.selectNum;
    const { count } = this.state;
    this.setState({ count: count - (+value) });
  }
  incrementOfOdd = () => {
    const { value } = this.selectNum;
    const { count } = this.state;
    if (count % 2 !== 0) {
      this.setState({ count: count + (+value) });
    }
  }
  asyncIncrement = () => {
    const { value } = this.selectNum;
    const { count } = this.state;
    setTimeout(() => {
      this.setState({ count: count + (+value) });
    }, 500);
  }
  render() {
    return (
      <div>
        <h1>当前求和为：{this.state.count}</h1>
        <select ref={(c) => { this.selectNum = c; }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementOfOdd}>为奇数时加</button>&nbsp;&nbsp;
        <button onClick={this.asyncIncrement}>异步加</button>&nbsp;&nbsp;
      </div>
    )
  }
}
