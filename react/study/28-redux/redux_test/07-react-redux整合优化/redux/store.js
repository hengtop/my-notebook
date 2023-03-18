//引入creatStore。用于创建redux中的核心对象store
import { createStore, applyMiddleware } from 'redux'
//引入redux-thunk，用以支持异步action
import thunk from 'redux-thunk'
//引入为Count组件服务的reducer
import countReducer from './reducer'
//暴露
export default createStore(countReducer, applyMiddleware(thunk));