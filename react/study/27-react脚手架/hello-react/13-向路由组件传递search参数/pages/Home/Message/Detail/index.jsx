import React, { Component } from 'react'
import qs from 'querystring'//处理urlencode类型的字符串
const data = [
  { id: 1, title: '你好世界', content: 'hahha' },
  { id: 2, title: '加油啊', content: 'jojo' },
  { id: 3, title: '你很厉害吧', content: 'lallala' }
]
export default class Detail extends Component {

  render() {
    console.log(this.props);
    //接收paarams参数
    //const { match: { params: { id, title } } } = this.props;
    //接收search参数
    const { search } = this.props.location;
    const {id, title} = qs.parse(search.slice(1));
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
