const { Graph } = require("./graph");

const BFS_01 = [
  ["A", "B"],
  ["A", "F"],
  ["B", "C"],
  ["B", "I"],
  ["B", "G"],
  ["C", "I"],
  ["C", "D"],
  ["D", "I"],
  ["D", "G"],
  ["D", "E"],
  ["D", "H"],
  ["E", "H"],
  ["E", "F"],
  ["F", "G"],
  ["G", "H"],
];

const BFS_02 = [
  [0, 1],
  [0, 4],
  [1, 2],
  [2, 0],
  [2, 4],
  [2, 5],
  [3, 1],
  [4, 6],
  [4, 7],
  [5, 3],
  [5, 7],
  [6, 2],
  [6, 7],
];

const DFS_01 = [
  [0, 1],
  [1, 3],
  [1, 5],
  [1, 6],
  [1, 2],
  [2, 4],
  [3, 7],
];

const DFS_02 = [
  ["a", "b"],
  ["a", "e"],
  ["b", "e"],
  ["c", "b"],
  ["d", "a"],
  ["e", "c"],
  ["e", "f"],
  ["f", "c"],
];

const TOPO = [
  [0, 2],
  [1, 0],
  [2, 5],
  [2, 6],
  [3, 1],
  [3, 5],
  [3, 7],
  [5, 7],
  [6, 4],
  [7, 6],
];

// 有向图初始化
function d_initGraph(g, data) {
  data.forEach((item) => {
    g.addEdge(item[0], item[1], item[2]);
  });

  return g;
}

// 无向图初始化
function ud_initGraph(g, data) {
  data.forEach((item) => {
    g.addEdge(item[0], item[1], item[2]);
    g.addEdge(item[1], item[0], item[2]);
  });
  return g;
}

const g1 = ud_initGraph(new Graph(), BFS_01);

// g1.breadthFirstSearch("A", (v) => {
//   console.log(v.value);
// });

const g2 = d_initGraph(new Graph(), BFS_02);

// g2.breadthFirstSearch(5, (v) => {
//   console.log(v.value);
// });

const g3 = ud_initGraph(new Graph(), DFS_01);

// g3.depthFirstSearch(1, (v) => {
//   console.log(v.value);
// });

// const g4 = d_initGraph(new Graph(), DFS_02);

// g4.depthFirstSearch("a", (v) => {
//   console.log(v.value);
// });

const g4 = d_initGraph(new Graph(), DFS_02);

// g4.nrc_depthFirstSearch("d", (v) => {
//   console.log(v.value);
// });
// console.log("--------");
// g4.depthFirstSearch("d", (v) => {
//   console.log(v.value);
// });

// 注意初始化为有向无环图
const g5 = d_initGraph(new Graph(), TOPO);
console.log(g5.topologicalSort().map((item) => item.value));
