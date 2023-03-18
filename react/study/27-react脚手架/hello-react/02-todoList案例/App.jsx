import React, { Component } from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import Footer from './components/Footer/Footer'
import './App.css'

export default class App extends Component {
  state = {
    todoList:[
      {
        id: 1,
        name: '吃饭',
        isFinish: true
      },
      {
        id: 2,
        name: '睡觉',
        isFinish: true
      },
      {
        id: 3,
        name: '敲代码',
        isFinish: false
      },
      {
        id: 4,
        name: '打倒资本主义',
        isFinish: false
      }
    ]
  }
  //添加任务
  getAddTest = (todoObj) => {
    const {todoList} = this.state;
    const newsList = [todoObj,...todoList];
    this.setState({todoList: newsList});  
  }
  //更新任务
  changeTest = (id, isFinish) => {
    const {todoList} = this.state;
    const newsList = todoList.map(item => {
      if(item.id === id) {
        return {...item, isFinish}
      }
      else return item;
    });
    this.setState({todoList: newsList});
  }
  //删除任务
  deleteTest = (id) => {
    const {todoList} = this.state;
    const newsList = todoList.filter((item) => {
      return item.id !== id;
    });
    this.setState({todoList: newsList});
  }
  //全选/全不选
  checkAll = (flag) => {
    const {todoList} = this.state;
    const newsList = todoList.map((item) => {
      return {...item, isFinish: flag};
    });
    this.setState({todoList: newsList});
  }
  //清除已经完成的
  ClearFinished = () => {
    const {todoList} = this.state;
    const newsList = todoList.filter((item) => {
      return item.isFinish === false;
    });
    this.setState({todoList: newsList});
  }
  render() {
    const {todoList} = this.state;
    return (
      <div>
        <div className="todo-container">
          <div className="todo-wrap">
            <Header getAddTest={this.getAddTest} />
            <List todoList={todoList} changeTest={this.changeTest} deleteTest={this.deleteTest} />
            <Footer ClearFinished={this.ClearFinished} checkAll={this.checkAll} todoList={todoList} />
          </div>
        </div>
      </div>
    )
  }
}
