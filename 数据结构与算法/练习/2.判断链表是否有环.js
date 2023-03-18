const LinkedList = require("../链表/单项链表的封装");
// 可以使用快慢指针  一个指针走一步，另一个指针走两步 当指针出现相遇的时候，就证明诸葛链表存在环状

const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.head.next.next.next.next.next = list.head;
//console.log(list.toString());

function checkIsSurround(head) {
  let low = head;
  let fast = head.next;
  if (haed === null) return false;
  while (fast !== null && fast.next !== null) {
    if (low === fast) {
      return true;
    }
    low = low.next;
    fast = fast.next.next;
  }
  return false;
}

console.log(checkIsSurround(list.head));
