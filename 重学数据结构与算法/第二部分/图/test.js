const { Graph, WeightManager } = require("./graph");

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

const MST_01 = [
  [0, 2, 2],
  [0, 4, 7],
  [1, 2, 3],
  [1, 5, 1],
  [1, 6, 7],
  [2, 4, 4],
  [2, 5, 3],
  [2, 6, 6],
  [3, 7, 9],
  [4, 6, 8],
  [5, 6, 4],
  [5, 7, 5],
];

const MST_02 = [
  ["A", "B", 17],
  ["A", "F", 1],
  ["A", "E", 16],
  ["B", "C", 6],
  ["B", "D", 5],
  ["B", "F", 11],
  ["C", "D", 10],
  ["D", "E", 4],
  ["D", "F", 14],
  ["E", "F", 33],
];

const SP = [
  ["A", "B", 10],
  ["A", "D", 30],
  ["A", "E", 100],
  ["B", "C", 50],
  ["C", "E", 10],
  ["D", "C", 20],
  ["D", "E", 60],
];

const NEGATIVE_WEIGHT1 = [
  ["A", "B", -1],
  ["A", "C", 4],
  ["B", "C", 3],
  ["B", "D", 2],
  ["B", "E", 2],
  ["D", "B", 1],
  ["D", "C", 5],
  ["E", "D", -3],
];

const NEGATIVE_WEIGHT2 = [
  [0, 1, 1],
  [1, 2, 7],
  [1, 0, -2],
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
// const g5 = d_initGraph(new Graph(), TOPO);
// console.log(g5.topologicalSort().map((item) => item.value));

// const g6 = ud_initGraph(new Graph(new WeightManager()), MST_01);
// const g7 = ud_initGraph(new Graph(new WeightManager()), MST_02);

// // prim
// console.log(g6.prim());
// console.log(g7.prim());

// // kruskal
// console.log(g6.kruskal());
// console.log(g7.kruskal());

//  最短路径 有向图和无向图都可以用
// const g8 = d_initGraph(new Graph(new WeightManager()), SP);
// const g9 = ud_initGraph(new Graph(new WeightManager()), SP);

const g10 = d_initGraph(new Graph(new WeightManager()), NEGATIVE_WEIGHT1);
const g11 = d_initGraph(new Graph(new WeightManager()), NEGATIVE_WEIGHT2);

// dijkstra
// for (const [k, v] of g9.dijkstra("A").entries()) {
//   console.log(
//     k,
//     v.weight,
//     v.pathInfos.toString((data) => {
//       return data.from + data.to;
//     })
//   );
// }

// console.log("--------");

// for (const [k, v] of g8.dijkstra("A").entries()) {
//   console.log(
//     k,
//     v.weight,
//     v.pathInfos.toString((data) => {
//       return data.from + data.to;
//     })
//   );
// }
// console.log("--------");
// // bellmanFord
// for (const [k, v] of g9.bellmanFord("A").entries()) {
//   console.log(
//     k,
//     v.weight,
//     v.pathInfos.toString((data) => {
//       return data.from + data.to;
//     })
//   );
// }

// console.log("--------");

// for (const [k, v] of g8.bellmanFord("A").entries()) {
//   console.log(
//     k,
//     v.weight,
//     v.pathInfos.toString((data) => {
//       return data.from + data.to;
//     })
//   );
// }

// for (const [k, v] of g10.bellmanFord("A").entries()) {
//   console.log(
//     k,
//     v.weight,
//     v.pathInfos.toString((data) => {
//       return data.from + data.to;
//     })
//   );
// }

// 存在负权环
// const paths = g11.bellmanFord(0);
// if (paths) {
//   for (const [k, v] of paths.entries()) {
//     console.log(
//       k,
//       v.weight,
//       v.pathInfos.toString((data) => {
//         return data.from + data.to;
//       })
//     );
//   }
// }

// floyd 多元路径算法测试
const g12 = d_initGraph(new Graph(new WeightManager()), SP);
const g13 = d_initGraph(new Graph(new WeightManager()), NEGATIVE_WEIGHT1);

g13.floyd().forEach((value, key1) => {
  //console.log(key1);
  value.forEach((value, key2) => {
    console.log(
      `${key1}到${key2} 权值为：${value.weight}, 路径为：`,
      value.pathInfos.toString((data) => {
        return data.from + data.to;
      })
    );
  });
  console.log("--------------------------");
});
