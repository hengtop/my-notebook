const Trie = require("./trie");

const trie = new Trie();

trie.add("zhangsan", 6);
trie.add("lisi", 7);
trie.add("zhangsan666", 77);
trie.add("zhangsan666777", 88);
trie.add("zhangsan666777", 99);
console.log(trie.size());
console.log(trie.remove("zhangsan"));
console.log(trie.remove("zhangsan666777"));
console.log(trie.contains("zhangsan666777"));
console.log(trie.size());
