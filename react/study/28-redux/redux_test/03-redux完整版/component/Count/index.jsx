import React, { Component } from 'react'
import store from '../../redux/store'//引入store
import {createDecrementAction, createIncrementAction} from '../../redux/action'
export default class Count extends Component {
  state = {}
  increment = () => {
    const { value } = this.selectNum;
    store.dispatch(createIncrementAction(+value));
  }
  decrement = () => {
    const { value } = this.selectNum;
    store.dispatch(createDecrementAction(+value));
  }
  incrementOfOdd = () => {
    const { value } = this.selectNum;
    if (store.getState() % 2 !== 0) {
      store.dispatch(createIncrementAction(+value));
    }
  }
  asyncIncrement = () => {
    const { value } = this.selectNum;
    setTimeout(() => {
      store.dispatch(createIncrementAction(+value));
    }, 500);
  }
  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
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
