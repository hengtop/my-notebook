const appendDiv = function(callback) {
  for (let index = 0; index < 5; index++) {
    const div = document.createElement('div');
    div.innerHTML = index;
    document.body.appendChild(div);
    if(typeof callback === "function") {
      callback(div);
    }
  }
}

appendDiv(function(node) {
  node.style.display = "none";
})