// 顶点
class Vertex {
  constructor(v) {
    this.value = v;
    // 存放指向自己顶点的边
    this.fromEdges = new Map();
    // 存放指向其他顶点的边
    this.toEdges = new Map();
  }
}

class Edge {
  constructor(form, to, weight) {
    // 有向的
    this.from = form;
    this.to = to;
    this.weight = weight;
  }
}

class Graph {
  constructor() {
    this.vertexs = new Map();
    this.edges = new Map();
  }

  addVertex(v) {
    if (this.vertexs.has(v)) return;
    this.vertexs.set(v, new Vertex(v));
  }

  addEdge(from, to, weight) {
    // 先判断from to顶点是否存在

    // 起始点
    let fromVertex = this.vertexs.get(from);
    if (fromVertex == null) {
      fromVertex = new Vertex(from);
      this.vertexs.set(from, fromVertex);
    }

    // 到达点
    let toVertex = this.vertexs.get(to);
    if (toVertex == null) {
      toVertex = new Vertex(to);
      this.vertexs.set(to, toVertex);
    }

    // 判断这条边是否存在 存在就更新否则添加
    const key = this.edgeKey(from, to);
    if (fromVertex.toEdges.has(key)) {
      // 更新权值
      const fromEdge = fromVertex.toEdges.get(key);
      fromEdge.weight = weight;
      // 引用关系所以不用更新两个顶点的
      // const toEdge = toVertex.get(key);
      // toEdge.weight = weight;
    } else {
      const edge = new Edge(from, to, weight);
      // 保存指向顶点的边
      fromVertex.toEdges.set(key, edge);
      toVertex.fromEdges.set(key, edge);
      // 将边保存起来
      this.edges.set(key, edge);
    }
  }

  // 根据 from 和 to 生成边的唯一key
  edgeKey(from, to) {
    return from.toString() + to.toString();
  }

  removeVertex(v) {
    const vertex = this.vertexs.get(v);
    if (vertex == null) return;
    // 迭代map删除边
    vertex.toEdges.forEach((edge) => {
      this.removeEdge(edge.from, edge.to);
    });
    vertex.fromEdges.forEach((edge) => {
      this.removeEdge(edge.from, edge.to);
    });
    this.vertexs.delete(v);
  }
  removeEdge(from, to) {
    // 先找到顶点

    let fromVertex = this.vertexs.get(from);
    if (fromVertex == null) return;

    // 到达点
    let toVertex = this.vertexs.get(to);
    if (toVertex == null) return;

    const key = this.edgeKey(from, to);
    fromVertex.toEdges.delete(key);
    toVertex.fromEdges.delete(key);
    this.edges.delete(key);
  }

  edgeSize() {
    return this.edges.size;
  }
  vertexSize() {
    return this.vertexs.size;
  }

  breadthFirstSearch(v, handle) {
    // 获取顶点
    const vertex = this.vertexs.get(v);
    if (vertex == null) return;
    const finishV = new Map();
    const queue = [];
    queue.push(vertex);
    finishV.set(v, vertex);
    while (queue.length !== 0) {
      const shiftV = queue.shift();
      handle(shiftV);
      for (const [, value] of shiftV.toEdges) {
        // 是否已经访问过
        if (finishV.has(value.to)) continue;
        // 找到顶点
        const nextV = this.vertexs.get(value.to);
        // 入队
        queue.push(nextV);
        // 标记访问
        finishV.set(value.to, nextV);
      }
    }

    finishV.clear();
  }

  depthFirstSearch(v, handle) {
    const dfs = (v, handle) => {
      if (finishV.has(v)) return;
      const vertex = this.vertexs.get(v);
      if (vertex == null) return;
      handle(vertex);
      finishV.set(v, vertex);
      for (const [, value] of vertex.toEdges) {
        dfs(value.to, handle);
      }
    };
    const finishV = new Map();
    dfs(v, handle);
    finishV.clear();
  }
}

// const g = new Graph();

// g.addEdge("v1", "v0", 9);
// g.addEdge("v1", "v2", 3);
// g.addEdge("v2", "v0", 2);
// g.addEdge("v2", "v3", 5);
// g.addEdge("v3", "v4", 1);
// g.addEdge("v0", "v4", 6);
//g.removeEdge("v0", "v4");

//g.removeVertex("v0");
// g.breadthFirstSearch("v1", (v) => {
//   console.log(v.value);
// });

// 所有顶点

// let v = "";
// g.vertexs.forEach((item) => {
//   v += "-" + item.value;
// });
// console.log(v);

// g.vertexs.forEach((item) => {
//   console.log("---" + item.value);
//   console.log("from：");
//   console.log(item.fromEdges);
//   console.log("to:");
//   console.log(item.toEdges);
//   console.log("--------------------------------");
// });

// console.log("边", g.edgeSize());
// console.log("顶点", g.vertexSize());

// console.log(g.edges);

module.exports = {
  Graph,
};
