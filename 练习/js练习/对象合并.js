const dest = {
  set a(val) {
    console.log('val', val);
  }
}

const src = {
  get a() {
    console.log('b');
    return 'foo'
  }
}

Object.assign(dest, src);
console.log(dest)

function Person(name) {
  this.name = name;
}

const p = new Person("zhangsan");
console.log(p);
console.log(p.constructor);
