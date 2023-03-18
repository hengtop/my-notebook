
const Tv = {
  close() {
    console.log('关闭电视机');
  },
  open() {
    console.log('打开电视机');
  }
}
//对象实现
/* const OpenTvCommand = function(receiver) {
  this.receiver = receiver  
}

OpenTvCommand.prototype.excute = function() {
  this.receiver.open();
}

OpenTvCommand.prototype.undo = function() {
  this.receiver.close();
}

const t = new OpenTvCommand(Tv);

t.excute();
t.undo() */

//闭包实现

function OpenTvCommand(receiver){
  function excute() {
    receiver.open()
  }
  function undo() {
    receiver.close()
  }
  return {
    excute,
    undo
  }
}

const t = OpenTvCommand(Tv);
t.excute();
t.undo()
