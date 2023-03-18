import { arr as testPoint } from "./testPoint";
type Point = [number, number]; // 第一个为经度 第二个为维度
interface PointsObj {
  point: Point;
  id: number;
}

// 计算两个经纬度点之间的距离（m）
const calculation2PointDistance = (point1: Point, point2: Point): number => {
  if (point1.length !== 2 || point2.length !== 2) {
    throw new Error("请传入正确的坐标数组");
  }
  // 经度
  let lng1 = point1[0];
  let lng2 = point2[0];
  // 维度
  let lat1 = point1[1];
  let lat2 = point2[1];
  // 地球半径
  const R = 6370996.81;
  let radLat1 = (lat1 * Math.PI) / 180.0;
  let radLat2 = (lat2 * Math.PI) / 180.0;
  let a = radLat1 - radLat2;
  let b = ((lng1 - lng2) * Math.PI) / 180.0;
  let s =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  return s;
};

// // 测试计算绵阳到成都的距离/*  */
// const chengdu: Point = [104.06, 30.67];
// const mianyang: Point = [104.73, 31.48];
// console.log(calculation2PointDistance(chengdu, mianyang) / 1000); // 110.37967338990521

// 计算垂线距离
const calcVertical = (start: Point, end: Point, center: Point): number => {
  let a = Math.abs(calculation2PointDistance(start, end));
  let b = Math.abs(calculation2PointDistance(start, center));
  let c = Math.abs(calculation2PointDistance(end, center));
  let p = (a + b + c) / 2;
  // 海伦公式
  let s = Math.sqrt(Math.abs(p * (p - a) * (p - b) * (p - c)));
  return (s * 2) / a;
};

// 抽稀递归函数
/**
 * @Date: 2022-05-05 15:19:01
 * @author: zhangheng
 * @description:
 * @param {pointsObj} 坐标集合数组对象，主要保存了index作为索引用于处理完之后的排序
 * @param {result} 结构数据同上，只是处理完后的结果
 * @param {start} 起始点
 * @param {end} 终止点
 * @param {dMax} 抽稀精度误差
 * @return {*}
 */
const recurseCompressLine = (
  pointsObj: PointsObj[],
  result: PointsObj[],
  start: number,
  end: number,
  dMax: number
): PointsObj[] => {
  if (start < end) {
    let maxDist = 0;
    let currentIndex = 0;
    let startPoint = pointsObj[start].point;
    let endPoint = pointsObj[end].point;
    for (let i = start + 1; i < end; i++) {
      let currentDist = calcVertical(startPoint, endPoint, pointsObj[i].point);
      if (currentDist > maxDist) {
        maxDist = currentDist;
        currentIndex = i;
      }
    }
    if (maxDist >= dMax) {
      //将当前点加入到过滤数组中
      result.push(pointsObj[currentIndex]);
      //将原来的线段以当前点为中心拆成两段，分别进行递归处理
      recurseCompressLine(pointsObj, result, start, currentIndex, dMax);
      recurseCompressLine(pointsObj, result, currentIndex, end, dMax);
    }
  }
  return result;
};

/**
 * @Date: 2022-05-05 15:16:58
 * @author: zhangheng
 * @description: 入口函数
 * @param {Point} points 原始的定位点位数组
 * @param {*} dMax 允许的抽稀精度误差
 * @return {*} 返回抽稀后的坐标点数组
 */
const sparseAlgorithm = (points: Point[], dMax = 10): Point[] => {
  if (!points || !(points.length > 2)) {
    return [];
  }
  const pointsObj = points.map((item, index) => ({
    point: item,
    id: index,
  }));
  let resultObj = recurseCompressLine(
    pointsObj,
    [],
    0,
    points.length - 1,
    dMax
  );
  // 至少会有首尾两个点保留
  resultObj.push(pointsObj[0]);
  resultObj.push(pointsObj[points.length - 1]);
  //保证顺序一致
  resultObj = resultObj.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) return 1;
    return 0;
  });
  return resultObj.map((item) => {
    return item.point;
  });
};

const time = "start";
console.time(time);
console.log(sparseAlgorithm(testPoint as Point[], 4));
console.timeEnd(time);
