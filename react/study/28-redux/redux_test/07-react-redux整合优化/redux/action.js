/* 
   该文件专门为count组件生成action对象
*/
import { INCREMENT, DECREMENT } from './constant'
export const createIncrementAction = data => ({ type: INCREMENT, data });
export const createDecrementAction = data => ({ type: DECREMENT, data });
//所谓的异步action就是指的是action的值为函数，同步的action的值就是object一般对象
//异步action一般都是调用同步action
export const createIncrementAsyncAction = (data, time) => {
   return (dispatch) => {
      setTimeout(() => {
         dispatch(createIncrementAction(data));
      }, time);
   }
}