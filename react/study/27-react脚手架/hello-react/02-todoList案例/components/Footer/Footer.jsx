import React, { Component } from 'react'
import './Footer.css'
export default class Footer extends Component {
  //全选或者全不选
  handleCheckAll = (event) => {
    this.props.checkAll(event.target.checked);
  }
  //清除已经完成的
  handleClearFinished = () => {
    this.props.ClearFinished();  
  }
  render() {
    const { todoList } = this.props;
    //已完成的个数
    const finishedCount = todoList.reduce((prev, curr) => {
      if (curr.isFinish) {
        return ++prev;
      } else return prev;
    }, 0);
    const todoListCount = todoList.length;
    return (
      <div className="todo-footer">
        <label>{/* defaultChecked 只在第一次起作用 */}
          <input type="checkbox" checked={finishedCount === todoListCount && todoListCount !== 0} onChange={this.handleCheckAll} />
          {/* 注意要判断删除完的时候全选按钮的状态 */}
        </label>
        <span>
          <span>已完成{finishedCount}</span> / 全部{todoListCount}
        </span>
        <button onClick={this.handleClearFinished} className="btn btn-danger">清除已完成任务</button>
      </div>
    )
  }
}
