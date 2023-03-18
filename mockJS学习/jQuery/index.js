
if (MOCK == 'true') {
  Mock.mock('/user/userinfo', 'get', {
    id: '@id',//随机id
    username: '@cname',
    date: '@date()',
    avatar: "@image('200x100', '#4A7BF7', 'Hello')",
    ip: '@ip()',
    email: '@email()'
  });
}
