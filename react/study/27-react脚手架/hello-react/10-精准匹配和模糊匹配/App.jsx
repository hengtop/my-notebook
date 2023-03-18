import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'//路由组件
import Header from './components/Header'//一般组件
import MyNavLink from './components/MyNavLink'
export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生靠a标签跳转不同页面 <a className="list-group-item" href="./about.html">About</a>
              <a className="list-group-item active" href="./home.html">Home</a> */}
              {/* 在react中靠路由链接切换组件 */}
              {/* 默认navlink是点击哪一个就给其加上一个类active，要设置其他类名就需要用到activeClassName这个属性 */}
              {/* 路由是默认模糊匹配的，path中写的路径link标签不能少，可以向后加内容也能匹配 */}
              <MyNavLink title="About" to='/about' >About</MyNavLink>
              <MyNavLink title="Home" to='/home/s' >Home</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Switch>
                  <Route path='/about' component={About} />
                  <Route exact={true} path='/home' component={Home} />
                  {/* exact为true就开启严格匹配 */}
                </Switch>{/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
