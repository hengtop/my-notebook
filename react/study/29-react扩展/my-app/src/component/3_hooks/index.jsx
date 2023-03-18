import React, { Component } from 'react'
import ReactDOM from 'react-dom'
/* 
export default class HooksDemo extends Component {
  state = {
    count: 0
  }
  add = () => {
    this.setState(state => ({ count: state.count + 1 }));
  }
  render() {
    return (
      <div>
        <h2>当前求和为{this.state.count}</h2>
        <button onClick={this.add}>点我加1</button>
      </div>
    )
  }
} */
export default function HooksDemo() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('tom');
  const myRef = React.useRef(); 
  function add() {
    //第一种写法setCount(count+1);
    setCount(count => count + 1)
  }
  function nameChange() {
    setName('jack')
  }
  function unMount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }
  function show() {
    console.log(myRef.current.value);
  }
  React.useEffect(() => {
    console.log("组件更新", count)
    return () => {
      console.log('卸载', count)
    }
  }, [count,name])

  return (
    <div>
      <input type="text" ref={myRef} />
      <h2>当前求和:{count}</h2>
      <h2>名字：{name}</h2>
      <button onClick={add}>点我加1</button>
      <button onClick={nameChange}>改名字</button>
      <button onClick={unMount}>点击卸载</button>
      <button onClick={show}>点击展示输入数据</button>
    </div>
  )
};

