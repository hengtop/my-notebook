class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  addEffect(effect) {
    this.subscribers.add(effect);
  }
  notify() {
    this.subscribers.forEach((effect) => {
      effect();
    });
  }
}

const info = {counter:100}

const dep = new Dep(); 

function addCounter() {
  console.log(info.counter*100)
}

addCounter();


dep.addEffect(addCounter);
info.counter++;
dep.notify();