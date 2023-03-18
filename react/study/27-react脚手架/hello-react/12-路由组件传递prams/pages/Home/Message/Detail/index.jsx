import React, { Component } from 'react'
const data = [
  { id: 1, title: '你好世界', content: 'hahha' },
  { id: 2, title: '加油啊', content: 'jojo' },
  { id: 3, title: '你很厉害吧', content: 'lallala' }
]
export default class Detail extends Component {

  render() {
    console.log(this.props);
    //接收paarams参数
    const { match: { params: { id, title } } } = this.props;
    let findData = data.find((item) => {
      return item.id === +id;//注意id的数据类型
    });
    return (
      <div>
        <ul>
          <li>ID: {id}</li>
          <li>Title: {title}</li>
          <li>Content:{findData.content}</li>
        </ul>
      </div>
    )
  }
}
