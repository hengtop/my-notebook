// 增删改查基本使用

//打开数据库，没有就会先创建
const dbRequest = indexedDB.open("zhangsan");
let db = null;

dbRequest.onerror = function (err) {
  console.log("数据库打开失败", err);
};

// 打开成功
dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

// 第一次打开或者升级成功后
dbRequest.onupgradeneeded = function (event) {
  const db = event.target.result;
  // 创建存储对象(表)，设置主键
  db.createObjectStore("user", { keyPath: "id" });
};

const buttons = document.querySelectorAll("button");
class User {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

const users = [
  new User(111, "saber", 14),
  new User(112, "lancer", 12),
  new User(113, "saber", 14),
];
for (let index = 0; index < buttons.length; index++) {
  const button = buttons[index];
  button.onclick = function () {
    const transaction = db.transaction("user", "readwrite");
    const store = transaction.objectStore("user");
    switch (index) {
      case 0:
        console.log("新增");
        for (const user of users) {
          const res = store.add(user);
          res.onsuccess = function () {
            console.log(user.name, "添加完毕");
          };
        }
        transaction.oncomplete = function () {
          console.log("添加完毕");
        };
        break;
      case 1: {
        console.log("查询");
        // 通过store.get直接查询,但是只能单独查询
        // const request = store.get(111);
        // request.onsuccess = function (event) {
        //   console.log(event.target.result);

        // };

        // 通过游标查询 指向每一行
        const request = store.openCursor();
        request.onsuccess = function (event) {
          const cursor = event.target.result;
          //配合游标多查询
          if (cursor) {
            console.log(cursor.key, cursor.value);
            // 继续查询
            cursor.continue();
          } else {
            console.log("查询完成");
          }
        };

        break;
      }
      case 3: {
        console.log("修改");
        // 通过store.get直接查询,但是只能单独查询
        // const request = store.get(111);
        // request.onsuccess = function (event) {
        //   console.log(event.target.result);

        // };

        // 通过游标查询 指向每一行
        const request = store.openCursor();
        request.onsuccess = function (event) {
          const cursor = event.target.result;
          //配合游标多查询
          if (cursor.key === 111) {
            const { value } = cursor;
            value.name = "haha";
            cursor.update(value);
            // 继续查询
          } else {
            cursor.continue();
          }
        };

        break;
      }

      case 2:
        console.log("删除");
        const request = store.openCursor();
        request.onsuccess = function (event) {
          const cursor = event.target.result;
          if (!cursor) {
            return;
          }
          //配合游标多查询
          if (cursor && cursor.key === 112) {
            cursor.delete();
            // 继续查询
          } else {
            cursor.continue();
          }
        };
        break;
    }
  };
}
