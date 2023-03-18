import React from 'react';
import Search from './components/Search';
import List from './components/List'
export default class App extends React.Component {
  state = {
    users: [],
    isFirst: true,//是否为第一次页面
    isLoading: false,//是否在加载中
    err: '',//请求错误信息

  }
  updateAppState = (stateObj) => {
    this.setState(stateObj);
  }
  render() {
    const {users} = this.state;
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState} />
        <List {...this.state} users={users} />
      </div>
    )
  }
}
