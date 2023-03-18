
import React from 'react';
export default class App extends React.Component {
  //使用fetch发送网络请求
  send = () => {
    fetch('/api1/search/users2?q=xxx').then(
      res => {
        console.log('联系成功');
        return res.json();
      }
    ).then(
      res => {
        console.log('获取成功', res);
      }).catch(err => { console.log(err); });
  }
  render() {
    return (
      <div onClick={this.send}>
        appdsadsa
      </div>
    )
  }
}
