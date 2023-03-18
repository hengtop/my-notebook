import React, { lazy, Suspense } from 'react';
import { NavLink, Route } from 'react-router-dom'
/* import Home from './pages/Home'
import About from './pages/About'//路由组件 */

//懒加载  
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

export default class LazyRoute extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生靠a标签跳转不同页面 <a className="list-group-item" href="./about.html">About</a>
              <a className="list-group-item active" href="./home.html">Home</a> */}
              {/* 在react中靠路由链接切换组件 */}
              {/* 默认navlink是点击哪一个就给其加上一个类active，要设置其他类名就需要用到activeClassName这个属性 */}
              <NavLink className="list-group-item" to="/about">About</NavLink>
              <NavLink className="list-group-item" to="/home">Home</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Suspense fallback={<h1>加载中。。。。</h1>}>
                  <Route path='/about' component={About} />
                  <Route path='/home' component={Home} />
                </Suspense>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
