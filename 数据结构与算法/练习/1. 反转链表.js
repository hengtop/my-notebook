const LinkedList = require("../链表/单项链表的封装");

const list = new LinkedList();

list.append(12);
list.append(11);
list.append(10);
list.append(9);
list.append(18);
function reverseList(head) {
  // 边界条件无需反转
  if (head === null || head?.next === null) return head;
  const newHead = reverseList(head?.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

//list.head = reverseList(list.head);
list.reverseList();
console.log(list.toString());
