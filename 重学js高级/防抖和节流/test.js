import { Debounce } from "./debounce.js";
import { Throttle } from "./throttle.js";

const d = new Debounce();
const t = new Throttle();

const input = document.getElementById("input");

const cancelBtn = document.getElementById("cancelBtn");

function handleInput(e) {
  console.log(e.target.value);
  return "777";
}

const deInput = t.v3(handleInput, 1500, {
  leading: true,
  trailing: true,
});

input.oninput = deInput;

cancelBtn.onclick = deInput.cancel;
