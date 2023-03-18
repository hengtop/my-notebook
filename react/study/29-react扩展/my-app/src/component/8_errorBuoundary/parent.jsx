import React, { Component } from 'react'
import Child from './child'
export default class Parent extends Component {
  state = { hasError: false }//用于表示子组件是否产生错误
  static getDerivedStateFromError(error) {
    console.log("123",error);
    return {
      hasError: true
    }
  }
  componentDidCatch() {
    //常用于收集错误发送给后台
  }
  render() {
    return (
      <div>
        <h2>我是parent组件</h2>
        {
          this.state.hasError ? <h2>错误了！！！1</h2> : <Child />
        }
      </div>
    )
  }
}
