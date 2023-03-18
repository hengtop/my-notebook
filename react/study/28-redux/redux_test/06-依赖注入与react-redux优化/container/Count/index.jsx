//引入Count的ui组件
import CountUI from '../../component/Count'
//引入connect用于连接ui组件和redux
import { connect } from 'react-redux'
import {
  createDecrementAction,
  createIncrementAction,
  createIncrementAsyncAction
} from '../../redux/action'


//使用connect创建并暴露一个Count的容器组件
export default connect(
  state => ({ count: state }),
  //mapDispatchToProps一般写法
  /* dispatch => ({
    increment: data => dispatch(createIncrementAction(data)),
    decrement: data => dispatch(createDecrementAction(data)),
    asyncIncrement: (data, time) => dispatch(createIncrementAsyncAction(data, time))
  }) */
  //mapDispatchToProps简写,所以可以用一个函数，也可以用一个对象
  {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    asyncIncrement: createIncrementAsyncAction
  }
)(CountUI);