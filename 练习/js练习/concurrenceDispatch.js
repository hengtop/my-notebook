/**
 * @descript 并发控制函数，生成一个可以控制并发执行数量的函数
 */

function createTaskDispatch(max = 5) {
  const untouchedTasks = [];

  const drainUntouchedTasks = () => {
    //console.log("hah");
    while (max > 0 && untouchedTasks.length > 0) {
      const task = untouchedTasks.shift();
      max--;
      task &&
        task().finally(() => {
          max++;
          drainUntouchedTasks();
        });
    }
  };

  return function dispatch(...task) {
    untouchedTasks.push(...task);
    drainUntouchedTasks();
  };
}

const taskDispatch = createTaskDispatch(3);

const task1 = () => {
  console.log("1111");
  return new Promise((resolve) => {
    setTimeout(() => {
      //console.log("task1");
      resolve();
    }, 3000);
  });
};
const task2 = () => {
  console.log("1111");
  return new Promise((resolve) => {
    setTimeout(() => {
      //console.log("task2");
      resolve();
    }, 2000);
  });
};

const task3 = () => {
  console.log("1111");
  return new Promise((resolve) => {
    setTimeout(() => {
      //console.log("task3");
      resolve();
    }, 3000);
  });
};

const task4 = () => {
  console.log("2222");
  return new Promise((resolve) => {
    setTimeout(() => {
      //console.log("task4");
      resolve();
    }, 1000);
  });
};

const task5 = () => {
  console.log("2222");
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log("task5");
      resolve();
    }, 1000);
  });
};

taskDispatch(task1, task2, task3, task4, task5);
