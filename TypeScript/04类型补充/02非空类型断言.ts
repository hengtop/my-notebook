function printMessageLength(message ?: string) {
  console.log(message!.length);//保证一定有值，即可通过编译
}

printMessageLength("hello world");