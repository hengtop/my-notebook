//引入creatStore。用于创建redux中的核心对象store
import { createStore, applyMiddleware } from 'redux'
//引入redux-thunk，用以支持异步action
import thunk from 'redux-thunk'
//引入redux开发者工具
import { composeWithDevTools } from 'redux-devtools-extension'
//引入汇总的allReducer
import allReducer from './reducers'

//暴露,要是我们没用中间件这个参数就直接将composeWithDevTools(),作为第二个参数，否者就将中间件函数放在composeWithDevTools中作为参数
export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));