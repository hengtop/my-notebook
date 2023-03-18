import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'//路由组件
import Text from './pages/Test'
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
              {/* 
                多级路由点击后刷新网页导致public中的index.html引入的css样式失效
                解决方法： 之前是通过./相对路径来写的，把 . 去掉就可以解决，或者将换成%PUBLIC_URL%也可
                          你不改路径也行，把路由改成hash模式即可
              */}
              <MyNavLink title="About" to='/zhangsan/about' >About</MyNavLink>
              <MyNavLink title="Home" to='/zhangsan/home' >Home</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                {/* 加上switch后react就不会匹配多个相同路径的路由组件，只会匹配第一个 */}
                <Switch>
                  <Route path='/zhangsan/about' component={About} />
                  <Route path='/zhangsan/home' component={Home} />
                  <Route path='/home' component={Text} />
                </Switch>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
