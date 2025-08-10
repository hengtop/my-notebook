document.addEventListener("DOMContentLoaded", function () {
  // 获取DOM元素
  const audioPlayer = document.getElementById("audioPlayer");
  const playList = document.getElementById("playList");
  const ListArr = document.querySelectorAll("#playList li");
  const currentPlayingTrackName = document.querySelector(
    ".currentPlayingTrackName"
  );
  let currentSong = 0;

  function setIndexPlayer(index) {
    const currentLi = ListArr[index];
    ListArr.forEach((li) => li.classList.remove("playing"));
    currentLi.classList.add("playing");

    const songPath = currentLi.getAttribute("data-song");
    audioPlayer.src = songPath;
    audioPlayer.load(); // 重新加载音频源

    // 更新当前播放显示
    const songName = currentLi.textContent;
    currentPlayingTrackName.textContent = songName;

    // 播放音乐
    audioPlayer.play().catch((e) => console.error("播放失败:", e));
  }

  // 切换为事件委托形式
  playList.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI") {
      // 获取索引
      const index = Array.prototype.slice.call(ListArr).indexOf(e.target);
      setIndexPlayer(index);
      currentSong = index;
    }
  });

  // 初始化显示
  currentPlayingTrackName.textContent = "无音源播放";

  audioPlayer.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % ListArr.length;
    setIndexPlayer(currentSong);
  });
});
