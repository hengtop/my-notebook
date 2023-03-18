import React, { Component } from 'react'
//引入connect用于连接ui组件和redux
import { connect } from 'react-redux'
import {
  createDecrementAction,
  createIncrementAction,
  createIncrementAsyncAction
} from '../../redux/action'

//ui组件
class Count extends Component {
  state = {}
  increment = () => {
    const { value } = this.selectNum;
    this.props.increment(+value);
  }
  decrement = () => {
    const { value } = this.selectNum;
    this.props.decrement(+value);
  }
  incrementOfOdd = () => {
    const { value } = this.selectNum;
    if(this.props.count % 2 !== 0){
      this.props.increment(+value);
    }
  }
  asyncIncrement = () => {
    const { value } = this.selectNum;
    this.props.asyncIncrement(+value, 500);
  }
  render() {
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
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


//使用connect创建并暴露一个Count的容器组件
export default connect(
  state => ({ count: state }),
  //mapDispatchToProps一般写法
  /* dispatch => ({
    increment: data => dispatch(createIncrementAction(data)),
    decrement: data => dispatch(createDecrementAction(data)),
    asyncIncrement: (data, time) => dispatch(createIncrementAsyncAction(data, time))
  }) */
  //mapDispatchToProps简写,所以可以用一个函数，也可以用一个对象
  {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    asyncIncrement: createIncrementAsyncAction
  }
)(Count);