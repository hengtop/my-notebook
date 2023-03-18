/**
 * Create by zhangheng on 2021/4/17
 */
class Node {
  constructor(key) {
    this.key = key;
    this.rChild = null;
    this.lChild = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  //插入新的一个键
  insert(key) {
    const newNode = new Node(key);
    //判断根节点是否有值
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }

  }

  //递归遍历函数
  insertNode(node, newNode) {
    if (newNode.key < node.key) {//向左查找
      if (node.lChild === null) {
        node.lChild = newNode;
      } else {
        this.insertNode(node.lChild, newNode);
      }
    } else {
      if (node.rChild === null) {
        node.rChild = newNode;
      } else {
        this.insertNode(node.rChild, newNode);
      }
    }
  }

  //先序遍历，中序遍历，后序遍历
  //先序遍历
  preOrderTraversal(handler) {
    traversal(this.root, handler);

    function traversal(node, handler) {
      if (node !== null) {
        handler(node.key);//处理经过的节点
        traversal(node.lChild, handler);
        traversal(node.rChild, handler);
      }
    }
  }

  //中序
  midOrderTraversal(handler) {
    traversal(this.root, handler);

    function traversal(node, handler) {
      if (node !== null) {
        traversal(node.lChild, handler);
        handler(node.key);//处理经过的节点
        traversal(node.rChild, handler);
      }
    }
  }

  //后序
  postOrderTraversal(handler) {
    traversal(this.root, handler);

    function traversal(node, handler) {
      if (node !== null) {
        traversal(node.lChild, handler);
        traversal(node.rChild, handler);
        handler(node.key);//处理经过的节点
      }
    }
  }

  //搜索一个键，没有返回false
  search(key) {
    return searchNode(this.root, key);

    function searchNode(node, key) {
      if (node === null) {
        return false;
      }
      if (node.key > key) {
        return searchNode(node.lChild, key);
      } else if (node.key < key) {
        return searchNode(node.rChild, key);
      } else {
        return true;
      }
    }
  }

  //寻找最值
  max() {
    //获取根节点
    let node = this.root;
    while (node.rChild != null) {
      node = node.rChild;
    }
    return node.key;
  }

  min() {
    //获取根节点
    let node = this.root;
    while (node.lChild != null) {
      node = node.lChild;
    }
    return node.key;
  }

  //删除操作
  remove(key) {
    let current = this.root;//需要删除的节点
    let parent = null;//父节点
    let isLChild = true;//是左子树？
    //寻找要删除的节点
    while (current.key !== key) {
      parent = current;
      if (key < current.key) {
        isLChild = true;
        current = current.lChild;
      } else {
        isLChild = false;
        current = current.rChild;
      }
      //找到最后节点都没有
      if (current === null) {
        return null;
      }
    }
    //删除操作
    if (current.lChild === null && current.rChild === null) { //1.删除的为叶子节点
      if (current === this.root) {
        this.root = null;
      } else if (isLChild) {
        parent.lChild = null;
      } else {
        parent.rChild = null;
      }
    } else if (current.rChild === null) {//2.删除的有一个子节点
      if (current === this.root) {
        this.root = current.lChild;
      } else if (isLChild) {
        parent.lChild = current.lChild;
      } else {
        parent.rChild = current.lChild;
      }
    } else if (current.lChild === null) {
      if (current === this.root) {
        this.root = current.root;
      } else if (isLChild) {
        parent.lChild = current.rChild;
      } else {
        parent.rChild = current.rChild;
      }
    } else {//有两个节点的情况
      const successor = getSuccessorNode(current);//获取后继节点
      if(current === this.root) {//是否根节点
        this.root = successor
      } else if(isLChild) {
        parent.lChild = successor;
      } else {
        parent.rChild = successor;
      }
      successor.lChild = current.lChild;
    }
    //找到后继节点
    function getSuccessorNode(delNode) {
      let successor = null;
      let current = delNode.rChild;
      let successorParent = null;//后继的父节点
      while(current !== null) {
        successorParent = successor;
        successor = current;
        current = current.lChild;
      }
      if(successor !== delNode.rChild) {
        if(successor.rChild !== null) {//后继节点是否有右子树
          successorParent.lChild = successor.rChild;
        }
        successor.rChild =  delNode.rChild;
      }
      return successor;
    }

  }
}

const bst = new BinarySearchTree();
bst.insert(5)
bst.insert(4)
bst.insert(7)
bst.insert(52)
bst.insert(78)
bst.insert(21)
bst.insert(34)
bst.insert(11)

let result = '';
bst.preOrderTraversal((key) => {
  result += key + " "
});
console.log(result);
bst.remove(21)
result = ''
bst.preOrderTraversal((key) => {
  result += key + " "
});
console.log(result);
console.log(bst.max());
console.log(bst.min());
console.log(bst.search(21));
/**/
