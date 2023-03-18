function delegate(client, delegation) {
  return {
    buttonWasPressed(...args) {
      return delegation.buttonWasPressed.apply(client, args)
    }
  }
}

const FSM = {
  offLightState: {
    buttonWasPressed() {
      console.log('关灯');
      this.currentState = this.onLightState;
    }
  },
  onLightState: {
    buttonWasPressed() {
      console.log('开灯');
      this.currentState = this.offLightState;
    }
  }
}

class Light {
  constructor() {
    this.offLightState = delegate(this, FSM.offLightState);
    this.onLightState = delegate(this, FSM.onLightState);
    this.currentState = this.offLightState;
    this.button = null;
  }
  init() {
    const button = document.createElement('button');
    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);
    this.button.onclick = () => {
      this.currentState.buttonWasPressed();
    }
  }
  setState(newState) {
    this.currentState = newState
  }
}

const light = new Light();
light.init();