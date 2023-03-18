// 所有的玩家
const players = [];

class Player {
  constructor(name, teamColor) {
    this.partners = [];
    this.enemies = [];
    this.state = 'alive';
    this.name = name;
    this.teamColor = teamColor;//队伍颜色
  }
  win() {
    console.log(this.name + '  win!')
  }
  lose() {
    console.log(this.name + ' lose!')
  }

  die() {
    //需要便利自己队友是否全部死完
    let all_dead = true;
    this.state = 'dead';
    for (let i = 0, partner; partner = this.partners[i++];) {
      if (partner.state !== 'dead') {
        all_dead = false;
        break;
      }
    }
    if (all_dead === true) {
      this.lose();
      //通知所有队友失败了
      for (let i = 0, partner; partner = this.partners[i++];) {
        partner.lose();
      }
      // 通知所有敌人游戏胜利
      for (let i = 0, enemy; enemy = this.enemies[i++];) {
        enemy.win()
      }
    }
  }
}


// 工厂函数创建玩家
function playerFactory(name, teamColor) {
  const newPlayer = new Player(name, teamColor);
  for (let i = 0, player; player = players[i++];) {
    // 有新的角色加入
    if (player.teamColor === newPlayer.teamColor) {
      //同一队的,相互
      player.partners.push(newPlayer);
      newPlayer.partners.push(player)
    } else {
      player.enemies.push(newPlayer);
      newPlayer.enemies.push(player)
    }
  }
  players.push(newPlayer);
  return newPlayer;
}

const player1 = playerFactory('玩家1', 'red')
const player2 = playerFactory('玩家2', 'red')
const player3 = playerFactory('玩家3', 'red')
const player4 = playerFactory('玩家4', 'red')

const player5 = playerFactory('玩家5', 'blue')
const player6 = playerFactory('玩家6', 'blue')
const player7 = playerFactory('玩家7', 'blue')
const player8 = playerFactory('玩家8', 'blue')

player1.die();
player2.die();
player3.die();
player4.die();