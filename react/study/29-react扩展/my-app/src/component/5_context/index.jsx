import React, { Component } from 'react'

const myContext = React.createContext();//创建context对象
const { Provider } = myContext;
export default class ContextDemo extends Component {
  state = { name: 'zhangsan' }
  render() {
    return (
      <div>
        <h1>我是父组件:{this.state.name}</h1>
        <Provider value={this.state.name}>
          <B />
        </Provider>

      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>我是b组件:???</h3>
        <C />
      </div>
    )
  }
}

class C extends Component {
  static contextType = myContext;
  render() {
    console.log(this.context);
    return (
      <div>
        <h4>我是c组件</h4>
        <D />
      </div>
    )
  }
}

class D extends Component {
  static contextType = myContext;
  render() {
    return (
      <div>
        <h5>我是D组件:{this.context}</h5>
        <myContext.Consumer>
          {
            value => (value+"!")
          }
        </myContext.Consumer>
      </div>
    )
  }
}