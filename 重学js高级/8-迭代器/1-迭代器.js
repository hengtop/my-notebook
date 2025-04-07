class Classroom {
  constructor(address, name, students) {
    this.address = address;
    this.name = name;
    this.students = students;
  }

  entry(newStudent) {
    this.students.push(newStudent);
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
      //自定义迭代结束调用的方法
      return: () => {
        console.log("迭代器提前终止了~");
        return { done: true, value: undefined };
      },
    };
  }
}

const classroom = new Classroom("3幢5楼205", "计算机教室", [
  "james",
  "kobe",
  "curry",
  "why",
]);
classroom.entry("lilei");

for (const stu of classroom) {
  console.log(stu);
  if (stu === "why") break;
}
