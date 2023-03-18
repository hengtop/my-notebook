import React, { Component } from 'react'
import Demo from './component/1_setState'
import LazyRoute from './component/2_lazyLoad'
import HooksDemo from './component/3_hooks'
import FragmentDemo from './component/4_fragment'
import ContextDemo from './component/5_context'
import OptimizeDemo from './component/6_optimize'
import RenderDemo from './component/7_renderProps'
import Parent from './component/8_errorBuoundary/parent'
import { BrowserRouter } from 'react-router-dom'
export default class App extends Component {
  render() {
    return (
      <div>
        app....
        <Demo x={1} />
        <BrowserRouter>
          <LazyRoute />
        </BrowserRouter>
        <HooksDemo />
        <FragmentDemo />
        <ContextDemo />
        <OptimizeDemo />
        <RenderDemo />
        <Parent />
      </div>
    )
  }
}
