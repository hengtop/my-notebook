import React, { Component } from 'react'
export default class RenderDemo extends Component {
  state = { carName: '兰博' }
  changeCar = () => {
    this.setState({ carName: '哈哈' })
  }
  render() {
    
    return (
      <div>
        <h2>我是父组件：{this.state.carName}</h2>
        <button onClick={this.changeCar}>点我</button>
        <B render={(name) => <C name={name} />} >
          <div>123</div>
          <div>1223</div>
          1212
        </B>
      </div>
    )
  }
}
class B extends Component {
  state = {name:'tom'}
  render() {
    console.log(this.props.children);
    return (
      <div>
        <h3>我是b组件:{this.props.render(this.state.name)}</h3>
      </div>
    )
  }
}

class C extends Component {
 
  render() {
    console.log(this.props, '来自b组件的')
    return (
      <div>
        <h4>我是c组件</h4>
      </div>
    )
  }
}