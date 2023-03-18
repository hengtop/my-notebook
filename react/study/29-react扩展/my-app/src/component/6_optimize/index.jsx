import React, { PureComponent, Component } from 'react'
//PureComponent用于重写shouldComponentUpdate，要是state状态不变还有props不变的话就不更新组件
export default class OptimizeDemo extends PureComponent {
  state = { carName: '奔驰' }
  changeCar = () => {
    this.setState({ carName: '哈哈' })
  }
 /*  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    console.log(this.props, this.state);
    if (this.state.carName === nextState.carName) {
      return false;
    }
    return true;
  } */
  render() {
    console.log('父组件更新了');
    return (
      <div>
        <h2>我是父组件：{this.state.carName}</h2>
        <button onClick={this.changeCar}>点我</button>
        <Child carName="jishi" />
      </div>
    )
  }
}

class Child extends PureComponent {
  /* shouldComponentUpdate(nextProps) {
    if (this.props.carName === nextProps.carName) {
      return false;
    }
    return true;
  } */
  render() {
    console.log('子组件更新了');
    return (
      <div>
        <h3>我是子组件:{this.props.carName}</h3>
      </div>
    )
  }
}
