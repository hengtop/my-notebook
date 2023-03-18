import React from 'react';
import axios from 'axios';
export default class App extends React.Component {
  getStudentData = () => {
    axios.get('http://localhost:3000/api1/search/users2').then(
      res => {
        console.log('成功');
        console.log(res);
      }/* , 
      err => {
        console.log('失败');
        console.log(err);
      } */
    );
  }
  render() {
    return (
      <div>
        <button onClick={this.getStudentData}>点我获取一些学生数据</button>
      </div>
    )
  }
}

//export default App;