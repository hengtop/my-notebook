/**
 * Create by zhangheng on 2021/4/17
 */
//反向指针
function ReverseList(pHead) {
  class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }

  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    //append() 尾部追加一个数据
    append(data) {
      const node = new Node(data);
      if (this.length === 0) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;//最后一个元素的下一个指向新元素
        node.prev = this.tail;//新元素的上一个指向之前的最后一个元素
        this.tail = node;//更新最后的元素
      }
      this.length++;
    }

    //向前遍历
    forWard() {
      let current = this.tail;
      let resultString = "";
      while (current) {
        resultString += current.data + " ";
        current = current.prev;
      }
      return resultString;
    }
  }

  const node = new DoublyLinkedList();
  for (let i = 0; i < pHead.length; i++) {
    node.append(pHead[i]);
  }
  return node.forWard()
}

console.log(ReverseList([1, 2, 3]));


