class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.superStrongLightState = new SuperStrongLightState(this);
    this.button = null;
  }
  init() {
    const button = document.createElement('button');
    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);
    this.currentState = this.offLightState;
    this.button.onclick = () => {
      this.currentState.buttonWasPressed();
    }
  }
  setState(newState) {
    this.currentState = newState
  }
}

class OffLightState {
  constructor(light) {
    this.light = light
  }
  buttonWasPressed() {
    console.log('弱光');
    this.light.setState(this.light.weakLightState);
  }
}

class WeakLightState {
  constructor(light) {
    this.light = light
  }
  buttonWasPressed() {
    console.log('强光');
    this.light.setState(this.light.strongLightState);
  }
}


class StrongLightState {
  constructor(light) {
    this.light = light
  }
  buttonWasPressed() {
    console.log('超强光');
    this.light.setState(this.light.superStrongLightState);
  }
}

class SuperStrongLightState {
  constructor(light) {
    this.light = light
  }
  buttonWasPressed() {
    console.log('关灯');
    this.light.setState(this.light.offLightState);
  }
}

const light = new Light();
light.init();