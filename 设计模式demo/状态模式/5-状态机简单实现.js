const FSM = {
  offLightState: {
    buttonWasPressed() {
      console.log('开灯');
      this.currentState = FSM.onLightState
    }
  },
  onLightState: {
    buttonWasPressed() {
      console.log('关灯');
      this.currentState = FSM.offLightState
    }
  }
}

class Light {
  constructor() {
    this.currentState = FSM.offLightState;
    this.button = null;
  }
  init() {
    const button = document.createElement('button');
    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);
    this.button.onclick = () => {
      this.currentState.buttonWasPressed.call(this);
    }
  }
  setState(newState) {
    this.currentState = newState
  }
}




const light = new Light();
light.init();