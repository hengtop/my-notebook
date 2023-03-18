import React, { Component } from 'react'

export default class Child extends Component {
  state = {
    users:[{name:18,age:'200'},{name:18,age:'200'},{name:18,age:'200'}]
  }
  render() {
    return (
      <div>
        <h2>我是child组件</h2>
        {
          this.state.users.map((item) => {
            return (
              <div>
                <h4 key={item.age}>{item.name}</h4>
                <h4 >{item.age}</h4>
              </div>

            )
          })
        }
      </div>
    )
  }
}
