import React, { Component } from 'react'
import './Item.css'
export default class Item extends Component {
  //状态在哪里操作状态的方法就在哪里
  state = { isMove: false }
  handleMouse = (flag) => {
    return () => {
      this.setState({ isMove: flag })
    }
  }
  handleCheck = (id) => {
    return (event) => {
      this.props.changeTest(id, event.target.checked);
    }
  }
  handleDelete = (id) => {
    return () => {
      if (window.confirm('确定删除吗？')) {
        this.props.deleteTest(id);
      }
    }
  }
  render() {
    const { id, name, isFinish } = this.props;
    const { isMove } = this.state;
    return (
      <li style={{ backgroundColor: isMove ? '#ddd' : 'white' }} onMouseMove={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
        <label>
          <input type="checkbox" checked={isFinish} onChange={this.handleCheck(id)} />
          <span>{name}</span>
        </label>
        <button onClick={this.handleDelete(id)} className="btn btn-danger" style={{ display: isMove ? 'block' : 'none' }} >删除</button>
      </li>
    )
  }
}
