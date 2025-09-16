const Amplitude = require("amplitudejs");
console.log(Amplitude);
const songs = [
  {
    name: "Aimer - 凍えそうな季節から",
    url: "../assets/music/Aimer - 凍えそうな季節から.m4a",
    album: "Aimer",
    cover_art_url: "../assets/images/dream.jpeg",
    artist: "Aimer",
    source: "本地",
  },
  {
    name: "アトラスサウンドチーム - やすらぎ -Reload-",
    url: "../assets/music/アトラスサウンドチーム - やすらぎ -Reload-.flac",
    cover_art_url: "../assets/images/GottaHaveYou.jpeg",
    album: "P3 Reload",
    artist: "P3R",
    source: "本地",
  },
  {
    name: "周杰伦 - 七里香",
    url: "../assets/music/周杰伦 - 七里 香.flac",
  },
  {
    name: "周杰伦 - 反方向的钟",
    url: "../assets/music/周杰伦 - 反 方向 的钟.flac",
  },
  {
    name: "周杰伦 - 搁浅",
    url: "../assets/music/周杰伦 - 搁 浅.flac",
  },
  {
    name: "周杰伦 - 龙卷风",
    url: "../assets/music/周杰伦 - 龙卷 风.flac",
  },
  {
    name: "川村ゆみ - キミの記憶",
    url: "../assets/music/川村ゆみ - キミの記憶.flac",
  },
];
Amplitude.init({
  songs,
  // 音量
  volume: 50,
});
