const { UnionFind: UnionFind_QF } = require("./quickFind");
const { UnionFind_S } = require("./quickUnion_S");
const { UnionFind: UnionFind_QU } = require("./quickUnion");
const { UnionFind_R } = require("./quickUnion_R");
const { UnionFind_RC } = require("./quickUnion_RC");
const { UnionFind_RPS } = require("./quickUnion_RPS");
const { UnionFind_RPSH } = require("./quickUnion_RPSh");

function test() {
  const count = 1500000;

  const uf1 = new UnionFind_QF(count);

  const uf2 = new UnionFind_S(count);

  const uf3 = new UnionFind_QU(count);

  const uf4 = new UnionFind_R(count);

  const uf5 = new UnionFind_RC(count);

  const uf6 = new UnionFind_RPS(count);

  const uf7 = new UnionFind_RPSH(count);

  // console.time("UnionFind_QF");
  // for (let i = 0; i < count; i++) {
  //   uf1.union(
  //     Math.floor(Math.random() * count),
  //     Math.floor(Math.random() * count)
  //   );
  // }

  // for (let i = 0; i < count; i++) {
  //   uf1.isSame(
  //     Math.floor(Math.random() * count),
  //     Math.floor(Math.random() * count)
  //   );
  // }
  // console.timeEnd("UnionFind_QF");

  // console.time("UnionFind_QU");
  // for (let i = 0; i < count; i++) {
  //   uf3.union(
  //     Math.floor(Math.random() * count),
  //     Math.floor(Math.random() * count)
  //   );
  // }

  // for (let i = 0; i < count; i++) {
  //   uf3.isSame(
  //     Math.floor(Math.random() * count),
  //     Math.floor(Math.random() * count)
  //   );
  // }
  // console.timeEnd("UnionFind_QU");

  console.time("UnionFind_S");
  for (let i = 0; i < count; i++) {
    uf2.union(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }

  for (let i = 0; i < count; i++) {
    uf2.isSame(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }
  console.timeEnd("UnionFind_S");

  console.time("UnionFind_R");
  for (let i = 0; i < count; i++) {
    uf4.union(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }

  for (let i = 0; i < count; i++) {
    uf4.isSame(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }
  console.timeEnd("UnionFind_R");

  console.time("UnionFind_RC");
  for (let i = 0; i < count; i++) {
    uf5.union(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }

  for (let i = 0; i < count; i++) {
    uf5.isSame(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }
  console.timeEnd("UnionFind_RC");

  console.time("UnionFind_RPS");
  for (let i = 0; i < count; i++) {
    uf6.union(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }

  for (let i = 0; i < count; i++) {
    uf6.isSame(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }
  console.timeEnd("UnionFind_RPS");

  console.time("UnionFind_RPSH");
  for (let i = 0; i < count; i++) {
    uf7.union(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }

  for (let i = 0; i < count; i++) {
    uf7.isSame(
      Math.floor(Math.random() * count),
      Math.floor(Math.random() * count)
    );
  }
  console.timeEnd("UnionFind_RPSH");
}

test();
