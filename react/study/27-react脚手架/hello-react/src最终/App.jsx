import React, { Component } from 'react'
import { Button, Space, DatePicker } from 'antd';
import { AndroidOutlined } from '@ant-design/icons'
//import 'antd/dist/antd.css';按需引入，这里删掉了
export default class App extends Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  }
  render() {
    return (
      <div>
        app....
        <Button type="primary" icon={<AndroidOutlined />} >Primary Button</Button>
        <AndroidOutlined />
        <Space direction="vertical">
          <DatePicker onChange={this.onChange} />
          <DatePicker onChange={this.onChange} picker="week" />
          <DatePicker onChange={this.onChange} picker="month" />
          <DatePicker onChange={this.onChange} picker="quarter" />
          <DatePicker onChange={this.onChange} picker="year" />
        </Space>
      </div>
    )
  }
}
