import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createIncrementAction} from '../../redux/actions/count'
//ui组件
class Count extends Component {
  increment = () => {
    const value = this.selectValue.value;
    this.props.increment(+value);
  }
  render() {
    return (
      <div>
        <h2>我是Count组件,下方组件人数为:{this.props.personNum.length}</h2>
        <h2>当前求和为：{this.props.Count}</h2>
        
        <select ref={c => this.selectValue = c} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>点我加一</button>
      </div>
    )
  }
}


export default connect(
  //映射状态,这里redux中的状态是个对象了，不仅仅只有一个count
  state => ({ Count: state.count, personNum: state.person }),
  //映射操作状态的方法
  {
    increment: createIncrementAction
  }
)(Count)