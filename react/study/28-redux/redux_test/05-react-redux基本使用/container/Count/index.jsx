//引入Count的ui组件
import CountUI from '../../component/Count'
//引入connect用于连接ui组件和redux
import { connect } from 'react-redux'
import {
  createDecrementAction,
  createIncrementAction,
  createIncrementAsyncAction
} from '../../redux/action'

//函数的返回值作为状态传递给组件作为组件props中的key，value
function mapStateToProps(state) {//这里的状态已经传进去了，只需要一个参数接收
  return { count: state }
}

//返回的对象中的value就是操作方法
function mapDispatchToProps(dispatch) {
  return {
    increment: data => dispatch(createIncrementAction(data)),
    decrement: data => dispatch(createDecrementAction(data)),
    asyncIncrement: (data, time) => dispatch(createIncrementAsyncAction(data, time))
  }
}

//使用connect创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);