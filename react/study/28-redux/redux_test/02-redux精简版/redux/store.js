//引入creatStore。用于创建redux中的核心对象store
import { createStore } from 'redux'
//引入为Count组件服务的reducer
import countReducer from './reducer'
//暴露
export default createStore(countReducer);