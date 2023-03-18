class Point<T> {
  x: T
  y: T
  z: T

  constructor(x: T, y: T, z: T) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const p = new Point<string>('1.3', '1.6', '1.7');
const p1 = new Point<number>(1, 2, 3);
export {}