import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { createAddPersonAction } from '../../redux/actions/person'
//ui组件
class Person extends Component {
  addList = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = { id: nanoid(), name, age }
    this.props.addList(personObj);
  }
  render() {
    return (
      <div>
        <h2>我是Person组件,上方的count为：{this.props.count}</h2>
        <input ref={c => this.nameNode = c} type="text" placeholder="输入名字" />&nbsp;&nbsp;
        <input ref={c => this.ageNode = c} type="text" placeholder="输入年龄" />
        <button onClick={this.addList} >添加</button>
        <ul>
          {
            this.props.person.map((item) => {
              return (
                <li key={item.id}>{item.name}, {item.age}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}


//容器组件
export default connect(
  //映射状态
  state => ({ person: state.person, count: state.count }),
  //映射状态操作方法
  {
    addList: createAddPersonAction
  }
)(Person)
