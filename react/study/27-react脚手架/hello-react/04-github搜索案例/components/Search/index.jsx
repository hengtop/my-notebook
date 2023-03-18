import React, { Component } from 'react'
import axios from 'axios'
export default class Search extends Component {
  search = () => {
    //获取用户输入（连续结构加重命名）
    const { input: { value: keyWord } } = this;//这句和{value} = this.input一样
    //发送请求前更新状态
    this.props.updateAppState({
      isFirst: false,
      isLoading: true
    })
    //发送网络请求
    axios.get('http://localhost:3000/api1/search/users?q=' + keyWord).then(
      res => {
        console.log('成功', res);
        //请求后更新状态
        this.props.updateAppState({
          isLoading: false,
          users: res.data.items
        });
      },
      err => {
        console.log('失败', err);
        //失败后更新状态
        this.props.updateAppState({ isLoading: false, 'err': err.message });
      }
    )
  }
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={c => { this.input = c }} type="text" placeholder="请输入关键词点击搜索" />&nbsp;<button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
