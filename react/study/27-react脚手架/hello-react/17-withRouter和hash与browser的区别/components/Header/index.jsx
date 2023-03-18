import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Header extends Component {
  goPage = () => {
    this.props.history.goForward();
  }
  backPage = () => {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="page-header"><h2>React Router Demo</h2><button onClick={this.goPage}>前进</button><button onClick={this.backPage}>返回</button></div>
    )
  }
}
export default withRouter(Header);//通过withRouter加工的一般组件就可以拥有路由组件的api了
//withRouter的返回值是一个新组件