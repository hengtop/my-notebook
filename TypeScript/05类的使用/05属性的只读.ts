class Person {
  name: string 
  readonly friend?: Person
  constructor(name: string, frined?: Person) {
    this.name = name;
    this.friend = frined;
  }
}

const p = new Person('zhangsan', new Person('why', new Person("lisi")));
console.log(p);
//p.friend = {}