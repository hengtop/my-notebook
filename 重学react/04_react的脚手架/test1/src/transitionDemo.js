import React, { PureComponent } from "react";
import { Transition } from "react-transition-group";

const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default class transitionDemo extends PureComponent {
  render() {
    return <div>nihao</div>;
  }
}
