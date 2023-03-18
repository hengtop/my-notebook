import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item/Item'
import './List.css'
export default class List extends Component {
  static propTypes = {
    todoList: PropTypes.array.isRequired,
    changeTest: PropTypes.func.isRequired,
    deleteTest: PropTypes.func.isRequired
  }
  render() {
    const {todoList, changeTest, deleteTest} = this.props;
    return (
      <ul className="todo-main">
       {
         todoList.map((item) => {
           return <Item deleteTest={deleteTest} changeTest={changeTest} {...item} key={item.id} />
         })
       } 
      </ul>
    )
  }
}
