/**
 * Create by zhangheng on 2021/4/22
 */
const NONE = 'none';
const PENDING = 'pending'
const FINISH = 'finish';

const Queue = require('../队列/基于数组封装队列')
const Dictionary = require('../字典/字典封装')

class Graph {
  constructor() {
    this.vertexes = [];//顶点
    this.edges = new Dictionary();
  }

  //添加顶点
  addVertex(v) {
    this.vertexes.push(v);
    this.edges.set(v, [])
  }

  //添加边
  addEdge(v1, v2) {
    //如果为无向图则两个顶点都要添加
    this.edges.get(v1).push(v2);
    this.edges.get(v2).push(v1);
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.vertexes.length; i++) {
      result += this.vertexes[i] + '-->'
      let vEdges = this.edges.get(this.vertexes[i]);
      for (let j = 0; j < vEdges.length; j++) {
        result += vEdges[j] + ' ';
      }
      result += '\n';
    }
    return result;
  }

  //初始化顶点状态
  initializeStatus() {
    let status = {};
    for (let i = 0; i < this.vertexes.length; i++) {
      status[this.vertexes[i]] = NONE;
    }
    return status;
  }

  //广度优先搜索
  breadthFirstSearch(initV, handle) {
    const queue = new Queue();//创建队列
    const status = this.initializeStatus();//初始化状态
    //将顶点加入队列中
    queue.push(initV);
    //取出队列
    while (!queue.isEmpty()) {
      let v = queue.pop();
      //设置v的状态为pending
      status[v] = PENDING;
      //获取顶点相连的其他顶点
      const vList = this.edges.get(v);
      //将其他顶点加入队列中
      for (const vListElement of vList) {
        if (status[vListElement] === NONE) {//如果顶点没有被探测
          status[vListElement] = PENDING;//设置为探测中，以免被重复加入队列
          queue.push(vListElement);
        }
      }
      handle(v);//自定义函数处理顶点
      status[v] = FINISH;//设置顶点已完成
    }
  }

  //深度优先搜索
  depthFirstSearch(initV, handle) {
    const status = this.initializeStatus();
    const dfsVisit = (v, status, handle) => {
      status[v] = PENDING;
      handle(v);
      const vList = this.edges.get(v);
      for (const vListElement of vList) {
        if(status[vListElement] === NONE) {
          status[vListElement] = PENDING;//设置为正在搜索
          dfsVisit(vListElement, status, handle);
        }
      }
      status[v] = FINISH;
    }
    dfsVisit(initV, status, handle)
  }
}

const g = new Graph();
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertexes.length; i++) {
  g.addVertex(myVertexes[i]);
}
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('A', 'D');
g.addEdge('C', 'D');
g.addEdge('C', 'G');
g.addEdge('D', 'G');
g.addEdge('D', 'H');
g.addEdge('B', 'E');
g.addEdge('B', 'F');
g.addEdge('E', 'I');
let result = ""
g.depthFirstSearch('A', (v) => {
  result += v + ' ';
});
//console.log(g.toString())
console.log(result);
