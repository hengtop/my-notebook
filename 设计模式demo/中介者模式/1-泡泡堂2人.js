class Player {
  constructor(name) {
    this.name = name;
    this.enemy = null;//敌人
  }
  win() {
    console.log(this.name + ' won!');
  }
  lose() {
    console.log(this.name + ' lost!');
  }
  die() {
    this.lose();
    this.enemy.win();
  }
}

const player1 = new Player('皮蛋');
const player2 = new Player('小乖');

// 设置敌人
player1.enemy = player2;
player2.enemy = player1;

player1.die();
player2.die()