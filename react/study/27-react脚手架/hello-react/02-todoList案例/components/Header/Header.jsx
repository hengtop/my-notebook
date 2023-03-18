import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {nanoid} from 'nanoid';//用于生成唯一的id
import './Header.css'
export default class Header extends Component {
  //对接收的props进行类型和必要性的限制
  static propTypes = {
    getAddTest: PropTypes.func.isRequired
  }
  //键盘事件
  handleKeyUp = (event) => {
    const {keyCode, target} = event;
    if(keyCode === 13) {
      if(target.value.trim() === "") {//判断是否为空
        alert("输入不能为空！");
        return;
      }
      const todoObj = {id: nanoid(), name: target.value.trim(), isFinish: false}
      this.props.getAddTest(todoObj);//传递给父组件
      target.value = "";//清空输入框
    } else {
      return;
    }
  }
  render() {
    return (
        <div className="todo-header">
          <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
        </div>
    )
  }
}
