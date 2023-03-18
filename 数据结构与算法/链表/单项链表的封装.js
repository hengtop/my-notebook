//节点类
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

//链表类
class LinkedList {
  constructor() {
    //属性
    this.head = null;
    this.length = 0;
  }

  //链表尾部添加一个数据
  append(data) {
    const node = new Node(data);
    if (this.length === 0) {
      //如果是第一个节点就链接头节点
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        //当找到为null时就是尾节点了
        current = current.next; //一直往下找
      }
      current.next = node; //指向新节点
    }
    this.length++;
  }

  //任意位置插入
  insert(position, data) {
    if (position < 0) {
      //对position进行越界判断
      throw "[Parameter type error]:Position have to be an integer greater than zero";
    } else if (position > this.length) {
      //对position进行越界判断
      throw "[Parameter type error]:Position out of range";
    } else {
      const node = new Node(data);
      if (this.length === 0) {
        //如果长度为零就直接链接头节点
        this.head = node;
      } else {
        if (position === 0) {
          node.next = this.head;
          this.head = node;
        } else {
          let index = 0;
          let current = this.head;
          let previous = null; //current的前一个节点
          //找到对应位置的节点
          while (index++ < position) {
            //判断然后给current赋值后在递增
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
        }
      }
    }
    this.length++;
    return true;
  }

  //toString()方法实现
  toString(tmp = this.head) {
    let current = tmp;
    let resultString = "";
    while (current) {
      resultString += current.data + " ";
      current = current.next;
    }
    return resultString;
  }

  //get方法的实现  复杂度 o(n)
  get(position) {
    if (position < 0 || position >= this.length) {
      return null;
    } else {
      let index = 0;
      let current = this.head;
      while (index++ < position) {
        current = current.next;
      }
      return current.data;
    }
  }

  //indexOf方法实现
  indexOf(data) {
    let index = 0;
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return index;
      } else {
        current = current.next;
        index++;
      }
    }
    return -1;
  }

  //update方法实现
  update(position, data) {
    if (position < 0 || position >= this.length) {
      return false;
    } else {
      let index = 0;
      let current = this.head;
      while (index++ < position) {
        current = current.next;
        current.data = data;
      }
      return true;
    }
  }

  //removeAt 删除指定位置的元素  相较于数组，仅仅在插入或删除的时候复杂度为o(1),但整体的复杂度为o(n)
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false;
    } else {
      let index = 0;
      let current = this.head;
      let previous = null;
      if (position === 0) {
        this.head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next = null;
      }
      this.length--;
      return current.data;
    }
  }

  //remove 从列表移除某一项数据
  remove(data) {
    return !!this.removeAt(this.indexOf(data));
  }

  //判断是否链表为空
  isEmpty() {
    return !this.length;
  }

  size() {
    return this.length;
  }

  reverseList() {
    debugger;
    let current = this.head;
    let prev = null;
    while (current) {
      let nextNode = current.next;
      current.next = prev;
      prev = current;
      current = nextNode;
    }
    this.head = prev;
  }
  //指定位置反转
  reverseBetween(left, right) {
    if (left === right) {
      return this.head;
    } else {
      const newHead = new Node();
      newHead.next = this.head;
      let index = 1;
      let prev = newHead;
      let nextPrev = null;
      let current = this.head;
      while (index < left) {
        prev = current;
        current = current.next;
        index++;
      }
      nextPrev = current;
      let lastNode = prev;
      while (index <= right) {
        let nextNode = current.next;
        current.next = lastNode;
        lastNode = current;
        current = nextNode;
        index++;
      }
      prev.next = lastNode;
      nextPrev.next = current;
      this.head = newHead.next;
      return this.head;
    }
  }
}

const linkList = new LinkedList();
linkList.append("1");
linkList.append("2");
linkList.append("3");
linkList.append("4");
linkList.append("5");
//linkList.append('6');
//linkList.insert(1, '4');
/*console.log(linkList.get(1));
console.log(linkList.indexOf('saber'));
console.log(linkList.toString());
console.log(linkList.update(1, 'lancer'))
console.log(linkList.remove('hahah'));*/
//console.log(linkList.toString());
//console.log(linkList.size());
// console.log(linkList.reverseBetween(1, 5));
// console.log(linkList.toString());

module.exports = LinkedList;
