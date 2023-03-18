import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'
export default class List extends Component {
  state = {
    users: [],
    isFirst: true,//是否为第一次页面
    isLoading: false,//是否在加载中
    err: ''//请求错误信息
  }
  //订阅消息
  componentDidMount() {
    this.token = PubSub.subscribe('zhangsan', (msg, data) => {
      this.setState(data); 
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }
  render() {
    const { users, isLoading, isFirst, err } = this.state;
    return (
      <div className="row">
        {
          isFirst ? <h2>欢迎使用，输入关键字开始搜索</h2> :
          isLoading ? <h2>加载中...</h2> :
          err ? <h2 style={{color: 'red'}}>{err}</h2> :
          users.map((item) => {
            return (
              <div key={item.id} className="card">
                <a rel="noreferrer" href={item.html_url} target="_blank">
                  <img alt="github" src={item.avatar_url} style={{ width: '100px' }} />
                </a>
                <p className="card-text">{item.login}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
