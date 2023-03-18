/* 
   
   1. 该文件是用于创建一个为count服务的reducer，reducer的本质就是一个函数
   2. reducer函数会接收到两个参数，分别为之前的状态（preState）,动作对象（action）

*/
const initState = 0;//设置默认值
export default function reducer(preState = initState, action) {
  //获取type，data
  const { type, data } = action;
  switch (type) {
    case 'increment':
      return preState + data;
    case 'decrement':
      return preState - data;
      
    default:
      return preState;
  }
}