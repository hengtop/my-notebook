
import React from 'react';
import hello from './hello.module.css';//css的模块化样式，若用css编写样式有两个组件的类名一样，可以将样式文件名中间加上module中缀，然后通过该形式引入，在再通过对象形式加到标签上即可
export default class Hello extends React.Component {
  render() {
    return (
      <h2 className={hello.h2}>hello，REACT@@@@</h2>
    )
  }
}