const getStoreBtn = document.getElementById("getStore");
getStoreBtn.addEventListener("click", () => {
  console.log(localStorage.getItem("foo"));
});

console.log(window.myIsolatedAPI.doSomethingElse());
console.log(window.exposeInIsolatedWorld);
console.log(window.worldId);
