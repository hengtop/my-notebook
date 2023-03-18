// 所有的玩家
const players = [];

class PlayDirector {
  constructor() {
    // 所有玩家
    this.players = {};
    // 中介者可执行的操作
    this.options = {};
  }
  addPlayer(player) {
    const teamColor = player.teamColor;
    this.players[teamColor] = this.players[teamColor] ?? [];
    this.players[teamColor].push(player);
  }
  remove(player) {
    const teamColor = player.teamColor;
    const teamPlayers = this.players[teamColor] ?? [];
    for (let i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  }
  changeTeam(player, newTeamColor) {
    console.log(player.name, '逃跑到' + newTeamColor + '成功');
    this.remove(player);
    player.teamColor = newTeamColor;
    this.addPlayer(player);
  }
  playerDead(player) {
    const teamColor = player.teamColor;
    const teamPlayers = this.players[teamColor];
    let all_dead = true;
    for (let i = 0, player; player = teamPlayers[i++];) {
      // 有一个活的就不算输
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }
    if (all_dead === true) {
      for (let i = 0, player; player = teamPlayers[i++];) {
        player.lose();
      }
      //其他队伍玩家赢
      for (const color in this.players) {
        if (color !== teamColor) {
          const teamPlayers = this.players[color];
          for (let i = 0, player; player = teamPlayers[i++];) {
            player.win();
          }
        }
      }
    }
  }
  reciveMessage(operationType, ...args) {
    this[operationType].apply(this, args);
  }
}

const playDirector = new PlayDirector();

class Player {
  constructor(name, teamColor) {
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
    this.state = 'dead';
    // 给中介者发消息，玩家死亡
    playDirector.reciveMessage('playerDead', this)

  }
  remove() {
    // 移除玩家
    console.log(this.name, '被移除游戏')
    playDirector.reciveMessage('remove', this)
  }
  changeTeam(teamColor) {
    // 玩家换队
    playDirector.reciveMessage('changeTeam', this, teamColor)
  }
}


// 工厂函数创建玩家
function playerFactory(name, teamColor) {
  const newPlayer = new Player(name, teamColor);
  // 给中介者发送消息，增加玩家
  playDirector.addPlayer(newPlayer)
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

player1.remove();
player2.changeTeam('blue');
player3.die();
player4.die();

