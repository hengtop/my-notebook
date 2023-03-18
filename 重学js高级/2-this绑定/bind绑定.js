const obj = {
  name:'zhangsan'
}
const obj2 = {
  name:'lisi'
}

function a() {
  console.log(this.name)
}

const b = a.bind(obj);
b()
b.call(obj2)
b.apply({name:'wangwu'})