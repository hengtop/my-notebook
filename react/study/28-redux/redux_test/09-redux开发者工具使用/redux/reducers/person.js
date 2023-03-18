import { ADDPERSON } from '../constant'

const initState = [{ id: '1', name: 'tom', age: 18 }];
export default function personReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case ADDPERSON:
      return [data, ...preState]//这里注意如果用push或者unshift来修改数据会导致页面数据不更新，因为这里是浅比较，只比较地址值
    default:
      return preState
  }
}