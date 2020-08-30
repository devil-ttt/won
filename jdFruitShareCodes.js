/*
水果互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写京东东农场的好友码。
// github action用户的好友互助码填写到Action->Settings->Secrets->new Secret里面(Name填写 FruitShareCodes(此处的Name必须按此来写,不能随意更改),内容处填写互助码,填写规则如下)
// 同一个京东账号的好友互助妈用@符号隔开,不同京东账号之间按Cookie隔开方法,即用&符号隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let FruitShareCodes = [
  '33fb200560974af683b876659b710eed@039b62a2726644e8830734088a12f6ca @e4e2830220794e1d93f1983f9034bce0@c4b053f9ce274f5294940afbca5d79e',//账号一的好友shareCode,不同好友中间用@符号隔开
  '2e3fe6ad5d9344508b0be19e451bd8c4@944c15c21f5047eb9c74d3977ce9dcd3',//账号二的好友shareCode，不同好友中间用@符号隔开
]
// 判断github action里面是否有水果互助码
if (process.env.FruitShareCodes && process.env.FruitShareCodes.split('&') && process.env.FruitShareCodes.split('&').length > 0) {
  FruitShareCodes = process.env.FruitShareCodes.split('&');
}
for (let i = 0; i < FruitShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['FruitShareCode' + index] = FruitShareCodes[i];
}
