import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import Detail from './Detail'
export default class Message extends Component {
  state = {
    messageList: [
      { id: 1, title: '消息1' },
      { id: 2, title: '消息2' },
      { id: 3, title: '消息3' }
    ]
  }
  replaceShow = (id, title) => {
    //replace跳转+params参数
    //this.props.history.replace(`/home/message/detail/${id}/${title}`);
    //query参数
    //this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`);
    //state参数
    this.props.history.replace(`/home/message/detail`, {id, title});
  }
  pushShow = (id, title) => {
     //push跳转+params参数
    //this.props.history.push(`/home/message/detail/${id}/${title}`);
    //query参数
    //this.props.history.push(`/home/message/detail?id=${id}&title=${title}`);
    //state参数
    this.props.history.push(`/home/message/detail`, {id, title});
  }
  render() {
    const { messageList } = this.state;
    return (
      <div>
        <ul>
          {
            messageList.map((item) => {
              return (
                <li key={item.id}>
                  {/* 向路由组件传递params参数 */}
                  {/* <Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link>&nbsp;&nbsp; */}
                  {/* 向路由组件传递search参数 */}
                  {/* <Link to={`/home/message/detail/?id=${item.id}&title=${item.title}`}>{item.title}</Link>&nbsp;&nbsp; */}
                  {/* 向路由组件传递state参数 */}
                  {/* 开启replace模式 */}
                  <Link to={{pathname: '/home/message/detail', state: {id: item.id, title: item.title}}}>{item.title}</Link>&nbsp;&nbsp;
                  <button onClick={() => this.pushShow(item.id, item.title)}>push</button><button onClick={() => this.replaceShow(item.id, item.title)}>replace</button>
                </li>
              )
            })
          }
        </ul>
        {/* 声明接受params参数 */}
        {/* <Route path={`/home/message/detail/:id/:title`} component={Detail}></Route> */}
        {/* search参数无需声明接收 */}
        {/* <Route path="/home/message/detail" component={Detail}></Route> */}
        {/* state参数无需声明接收 */}
        <Route path="/home/message/detail" component={Detail}></Route> 
      </div>
    )
  }
}
