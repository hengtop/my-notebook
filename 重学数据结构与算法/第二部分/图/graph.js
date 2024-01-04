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
    this.edges = new Set();
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
      const fromEdge = fromVertex.get(key);
      fromEdge.weight = weight;
      // 引用关系所以不用更新两个顶点的
      // const toEdge = toVertex.get(key);
      // toEdge.weight = weight;
    } else {
      const edge = new Edge(from, to, weight);
      fromVertex.toEdges.set(key, edge);
      toVertex.fromEdges.set(key, edge);
      // 将边保存起来
      this.edges.add(edge);
    }
  }

  // 根据 from 和 to 生成边的唯一key
  edgeKey(from, to) {
    return from.toString() + to.toString();
  }

  removeVertex() {}
  removeEdge(from, to) {}

  edgeSize() {
    return this.edges.size();
  }
  vertexSize() {
    return this.vertexs.size();
  }
}

const g = new Graph();

g.addEdge("v1", "v0", 9);
g.addEdge("v1", "v2", 3);
g.addEdge("v2", "v0", 2);
g.addEdge("v2", "v3", 5);
g.addEdge("v3", "v4", 1);
g.addEdge("v0", "v4", 6);

// 所有顶点

let v = "";
g.vertexs.forEach((item) => {
  v += "-" + item.value;
});
console.log(v);

g.vertexs.forEach((item) => {
  console.log("---" + item.value);
  console.log("from：");
  console.log(item.fromEdges);
  console.log("to:");
  console.log(item.toEdges);
  console.log("--------------------------------");
});

console.log(g.edges);
