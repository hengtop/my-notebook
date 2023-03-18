enum Direction {
  LEFT=100,
  RIGHT,
  TOP="top",
  BOTTON=1,
}
function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.LEFT:
      console.log(Direction.LEFT);
      console.log("向左");
      break;
    case Direction.RIGHT:
      console.log(Direction.RIGHT);
      console.log("向右");
      break;
    case Direction.TOP:
      console.log(Direction.TOP);
      console.log("向上");
      break;
    case Direction.BOTTON:
      console.log(Direction.BOTTON);
      console.log("向下");
      break;
    default:
      console.log("没有")  
  }
}

turnDirection(Direction.LEFT);
turnDirection(Direction.RIGHT);
turnDirection(Direction.TOP);
turnDirection(Direction.BOTTON);
export {};
