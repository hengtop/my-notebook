function query(params) {
  const querys = window.location.search.slice(1);
  const args = querys.split('&');
  for (const arg of args) {
    const item = arg.split('=')
    if(params === item[0]){
      return item[1]
    }
  }
}