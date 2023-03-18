const el  = document.getElementById("why") as HTMLImageElement;
el.src ="url"

class Person {
  
}

class Student extends Person {
  say() {
    console.log("stu")
  }
}

function says(p: Person) {
  (p as Student).say()
}


const stu = new Student();
says(stu);

export {}



