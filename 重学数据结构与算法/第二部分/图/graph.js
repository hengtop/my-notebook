const ObjectHeap = require("../../第一部分/07-二叉堆/objectHeap");
const LinkedList = require("../../第一部分/04-集合/linkList");

const { GenericQuickUnion } = require("../并查集/genericQuickUnion");

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
  constructor(from, to, weight) {
    // 有向的
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

class WeightManager {
  compare(w1, w2) {
    return w1 - w2;
  }

  add(w1, w2) {
    return w1 + w2;
  }
}

class Graph {
  constructor(weightManager) {
    this.vertexs = new Map();
    this.edges = new Map();
    this.weightManager = weightManager;
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
  nrc_depthFirstSearch(v, handle) {
    // 存放已经访问过的节点
    const vertex = this.vertexs.get(v);
    if (vertex == null) return;
    // 保存已访问的顶点集合
    const finishV = new Set();
    const stack = [];

    // 开始先入栈
    stack.push(vertex);
    // 记录访问
    finishV.add(v);
    // 处理逻辑
    handle(vertex);
    // 循环
    while (stack.length) {
      // 弹出第一个
      const topVertex = stack.pop();

      // 访问该顶点的其他边
      for (const [, value] of topVertex.toEdges) {
        // 判断是否已经访问过
        // 如果这条边的顶点你已经访问过就换
        if (finishV.has(value.to)) continue;
        // 将边的两边顶点加入栈中
        // 这里为什么要将from再次加入 是因为之后回来后要访问该点的其他边
        stack.push(this.vertexs.get(value.from));
        stack.push(this.vertexs.get(value.to));
        finishV.add(value.to);
        handle(this.vertexs.get(value.to));
        break;
      }
    }
  }
  /**
   * 返回图的拓扑排序
   * @returns list
   */
  topologicalSort() {
    const list = [];
    const queue = [];
    const indegreeMap = new Map();
    // 初始化，将度为0的节点放入队列中,其余的记录到map中
    this.vertexs.forEach((v, k) => {
      let indegree = v.fromEdges.size;
      if (indegree === 0) {
        queue.push(v);
      } else {
        // 记录入度
        indegreeMap.set(k, indegree);
      }
    });
    while (queue.length) {
      const resV = queue.shift();
      list.push(resV);
      // 更新其他节点的度
      for (let [, value] of resV.toEdges) {
        let toIn = indegreeMap.get(value.to) - 1;
        if (toIn === 0) {
          queue.push(this.vertexs.get(value.to));
        } else {
          // 更新度
          indegreeMap.set(value.to, toIn);
        }
      }
    }
    return list;
  }
  // prim算法 根据堆的复杂度来看
  prim() {
    // 获取一个顶点
    const { value: vertex, done } = this.vertexs.values().next();
    if (done) return null;

    const edgeInfos = new Set();
    // 已经被切分过的边的起点
    const splitVertex = new Set();
    splitVertex.add(vertex.value);
    // 获取这个顶点的边，并放入二叉堆中
    const heapQueue = new ObjectHeap([...vertex.toEdges.values()], (a, b) => {
      if (typeof a !== typeof b) {
        throw Error("The type of a and b is different");
      } else {
        return this.weightManager.compare(b.weight, a.weight);
      }
    });

    // 二叉堆为空，且边的数量小于顶点的数量-1
    while (!heapQueue.isEmpty() && edgeInfos.size < this.vertexs.size - 1) {
      // 拿到权值最小的边
      const edge = heapQueue.remove();
      if (splitVertex.has(edge.to)) continue;
      // 保存 权最小的边
      edgeInfos.add(edge);
      // 保存 已经被切分过的边的起点
      splitVertex.add(edge.to);
      // 然后再把边指向的顶点的边全加入到最小堆里
      this.vertexs.get(edge.to).toEdges.forEach((value) => {
        heapQueue.add(value);
      });
    }
    return edgeInfos;
  }
  // Kruskal 算法  O(ElogE)
  kruskal() {
    if (this.edges.size === 0) return null;
    const edgeInfos = new Set();
    const VertexUnion = new GenericQuickUnion();
    // O(Edge)
    const heapQueue = new ObjectHeap([...this.edges.values()], (a, b) => {
      if (typeof a !== typeof b) {
        throw Error("The type of a and b is different");
      } else {
        return this.weightManager.compare(b.weight, a.weight);
      }
    });

    // 初始化集合
    // O(V)
    this.vertexs.forEach((value, key) => {
      VertexUnion.makeSet(key);
    });

    // 最坏的情况时循环到堆空了 O(ElogE)
    while (!heapQueue.isEmpty() && edgeInfos.size - 1 < this.vertexs.size - 1) {
      const edge = heapQueue.remove();
      // 如果构成环就跳过  并查集比较 O(a(n))  a(n) < 6
      if (VertexUnion.isSame(edge.from, edge.to)) continue;
      edgeInfos.add(edge);
      // 组成一个集合
      // O(logE)
      VertexUnion.union(edge.from, edge.to);
    }
    return edgeInfos;
  }
  // Dijkstra 算法 单元最短路径
  /**
   *
   * @param {*} begin 起点
   * @returns {Map<end,weight>} 终点和最短的权值
   */
  //todo 优化？ getShortestPath利用索引堆实现获取最小值
  dijkstra(begin) {
    const beginV = this.vertexs.get(begin);
    if (beginV == null) return null;

    // 被拽起来的路径
    const selectPaths = new Map();
    const paths = new Map();

    // 初始化
    beginV.toEdges.forEach((edge) => {
      const path = {
        weight: edge.weight,
        pathInfos: new LinkedList(),
      };
      path.pathInfos.push(edge);
      paths.set(edge.to, path);
    });

    while (paths.size !== 0) {
      // 拿到最短的key-value
      const [minV, minPath] = this.getShortestPath(paths);
      selectPaths.set(minV, minPath);
      paths.delete(minV);
      this.vertexs.get(minV).toEdges.forEach((edge) => {
        // 松弛操作 更新这条边的终点和原点的距离 起点不需要松弛
        // 新的路径权值和旧的路径的权值进行比较
        if (selectPaths.has(edge.to)) return;
        this.relax(edge, minPath, paths);
      });
    }
    selectPaths.delete(begin);
    return selectPaths;
  }
  // bellmanFord 算法
  bellmanFord(begin) {
    const beginV = this.vertexs.get(begin);
    if (beginV == null) return null;
    const selectPaths = new Map();
    const path = {
      weight: 0, // 避免空指针yichang
      pathInfos: new LinkedList(),
    };
    selectPaths.set(begin, path);

    for (let i = 0; i < this.vertexs.size - 1; i++) {
      this.edges.forEach((edge) => {
        const fromPath = selectPaths.get(edge.from);
        if (fromPath == null) return;
        this.relax(edge, fromPath, selectPaths);
      });
    }

    // 如果还能进行松弛操作则存在负权环
    for (let i = 0; i < this.vertexs.size - 1; i++) {
      this.edges.forEach((edge) => {
        const fromPath = selectPaths.get(edge.from);
        if (fromPath == null) return;
        if (this.relax(edge, fromPath, selectPaths)) {
          throw new Error("存在负权环");
        }
      });
    }
    selectPaths.delete(begin);
    return selectPaths;
  }
  /**
   *
   * @param {Map<any, any>} map key为顶点 value为权值
   * @returns 返回最短的key-value
   */
  getShortestPath(map) {
    let it = map.entries();
    const { value, done } = it.next();
    if (done) return null;
    // 初始化
    let [minV, path] = value;
    while (true) {
      const { value, done } = it.next();
      if (done) break;
      if (this.weightManager.compare(value[1].weight, path.weight) < 0) {
        [minV, path] = value;
      }
    }
    return [minV, path];
  }
  /**
   * @description 松弛函数
   * @param {*} edge 边
   * @param {*} minPath 权值最小的路径信息
   * @param {*} paths 保存已经松驰过的点信息
   * @returns
   */
  relax(edge, minPath, paths) {
    const newWeight = this.weightManager.add(minPath.weight, edge.weight);
    let oldPath = paths.get(edge.to);

    if (
      oldPath != null &&
      this.weightManager.compare(newWeight, oldPath.weight) >= 0
    )
      // 松弛失败
      return false;
    // 如果是空或才会新建路径
    if (oldPath == null) {
      oldPath = {
        weight: null,
        pathInfos: new LinkedList(),
      };
      // 因为存在set操作，所以getShortestPath暂时用的基本方式获取最小值，如果要使用堆的话可以考虑索引堆
      paths.set(edge.to, oldPath);
    } else {
      oldPath.pathInfos.clear();
    }

    oldPath.weight = newWeight;
    // 更新最短路径
    for (let i = 0; i < minPath.pathInfos.size; i++) {
      oldPath.pathInfos.push(minPath.pathInfos.get(i));
    }
    oldPath.pathInfos.push(edge);
    // 松弛成功
    return true;
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
  WeightManager,
};
