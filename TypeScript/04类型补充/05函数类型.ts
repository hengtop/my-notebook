function foo() {

}

type FnType = () => void

function bar(fn: FnType) {
  fn();
}