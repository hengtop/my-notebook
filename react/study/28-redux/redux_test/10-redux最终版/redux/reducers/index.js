/* 该文件用于用于汇总所有的reducer为一个总的reducers */
//引入汇总的api
import {combineReducers} from 'redux'
//引入为Count，Person组件服务的reducer
import countReducer from './count'
import personReducer from './person'
export default combineReducers({
  count: countReducer,
  person: personReducer
});