class Singleton {
  constructor(name) {
    this.name = name;
  }
  static instance = null;
  getName(){
    console.log(this.name);
  }
  static getInstance(name){
    if(!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }
}

const a = Singleton.getInstance('zhangsan');
const b = Singleton.getInstance('lisi');

console.log(a.name);
console.log(b.name);
console.log(a === b);


