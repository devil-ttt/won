/*
更新时间: 2020-07-27 22:30

腾讯新闻签到修改版，可以自动阅读文章获取红包，该活动为瓜分百万现金挑战赛，针对幸运用户参与

获取Cookie方法:
1.把以下配置复制到响应配置下
2.打开腾讯新闻app，阅读几篇文章，倒计时结束后即可获取阅读Cookie;
3.看一次推荐视频获取视频地址
4.可能腾讯有某些限制，有些号码无法领取红包，手动阅读几篇，能领取红包，一般情况下都是正常的，
5.此脚本根据视频红包数开启通知，默认4个红包一次，此版本和另一版本相同
版本更新日志:
1.01 修复无法自动获取视频红包，修改通知为视频红包到账通知间隔，即有红包到账且红包数除以间隔余0时通知，或者自定义常开或常关，
1.02 支持boxjs配置，增加通知跳转链接https://news.qq.com/FERD/cjRedDown.htm，需手动领取此红包
---------------------
Surge 4.0
[Script]
腾讯新闻 = type=cron,cronexp=0 8 0 * * *,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/txnews.js,script-update-interval=0

腾讯新闻 = type=http-request,pattern=https:\/\/api\.inews\.qq\.com\/event\/v1\/user\/event\/report\?,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/txnews.js, requires-body=true

~~~~~~~~~~~~~~~~~~~~~
Loon 2.1.0+
[Script]
# 本地脚本
cron "04 00 * * *" script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/txnews.js, enabled=true, tag=腾讯新闻

http-request https:\/\/api\.inews\.qq\.com\/event\/v1\/user\/event\/report\? script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/txnews.js, requires-body=true

-----------------

QX 1.0.7+ :
 [task_local]
0 9 * * * txnews.js, tag=腾讯新闻
 [rewrite_local]
https:\/\/api\.inews\.qq\.com\/event\/v1\/user\/event\/report\? url script-request-body txnews.js

~~~~~~~~~~~~~~~~~~
 [MITM]
hostname = api.inews.qq.com

---------------------------

Cookie获取后，请注释掉Cookie地址。

*/
const cookieName = '腾讯新闻';
const $ = new Env(cookieName);
let notifyInterval = $.getdata('notifynum')||4; //视频红包间隔通知开为1，常关为0;
let logs = $.getdata('logsturn')||false; // 日志开关，0为关，1为开;

const signurlVal = $.getdata('sy_signurl_txnews2')
const cookieVal = $.getdata( 'sy_cookie_txnews2')
const videoVal = $.getdata( 'video_txnews2')

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie()
} else {
   all()
}

function GetCookie() {
if ($request &&$request.body.indexOf("article_read")> -1) {
  const signurlVal =  $request.url
  const cookieVal = $request.headers['Cookie'];
  $.log(`signurlVal:${signurlVal}`)
  $.log(`cookieVal:${cookieVal}`)
  if (signurlVal) $.setdata(signurlVal, 'sy_signurl_txnews2')
  if (cookieVal) $.setdata(cookieVal,  'sy_cookie_txnews2')
  $.msg(cookieName, `获取Cookie: 成功🎉`, ``)
  }
if ($request &&$request.body.indexOf("video_read")> -1) {
  const videoVal =  $request.url
  $.log(`videoVal:${videoVal}`)
  if (videoVal) $.setdata(videoVal,  'video_txnews2')
  $.msg(cookieName, `获取视频地址: 成功🎉`, ``)
  }
 }
async function all() 
{ 
  await getsign();
  await activity();
  await toRead();
  await lookVideo();
  await openApp();
  await shareApp();
  await Redpack();
  await videoPack();
  await StepsTotal();
  await getTotal();
  await showmsg();
}

//签到
function getsign() {
 return new Promise((resolve, reject) => {
  const llUrl = {
    url: `https://api.inews.qq.com/task/v1/user/signin/add?`,headers:{Cookie: cookieVal}
  };
   $.post(llUrl, (error, response, data) => {   
      if(logs == 'true')console.log(`${cookieName}签到 - data: ${data}`)
      const obj = JSON.parse(data)
      if (obj.info=="success"){
       next = obj.data.next_points
       tip =  obj.data.tip_soup
       Dictum = tip.replace(/[\<|\.|\>|br]/g,"")+""+obj.data.author.replace(/[\<|\.|\>|br|图|腾讯网友]/g,"")
       signinfo =  '【签到信息】连续签到' + obj.data.signin_days+'天 '+'明日+'+ next +'金币 成功🎉\n'}
      else {
       $.msg('签到失败，🉐登录腾讯新闻app获取cookie', "", "")
       console.log('签到失败，🉐登录腾讯新闻app获取cookie'+data)
       return
     }
  resolve()
    })
  })
}


//阅读阶梯
function toRead() {
return new Promise((resolve, reject) => {
  const toreadUrl = {
    url: signurlVal, headers: {Cookie:cookieVal},
    body: 'event=article_read'
  };
   $.post(toreadUrl,(error, response, data) =>{
     if(logs == "true")console.log(`${cookieName}阅读文章 - data: ${data}`)
    resolve()
    })
   })
  }
function lookVideo() {
 return new Promise((resolve, reject) => {
   const lookVideoUrl = {
    url: videoVal, 
    headers: {Cookie:cookieVal},
    body: 'event=video_read'
  };
   $.post(lookVideoUrl,(error, response, data) =>{
    if (error){
      $.msg(cookieName, '观看视频:'+ error)
        }else{
          if(logs == "true")$.log(`${cookieName}观看视频 - data: ${data}`)
    }
   resolve()
    })
   })
 }


//阅读文章统计
function StepsTotal() {
  const ID =  signurlVal.match(/devid=[a-zA-Z0-9_-]+/g)
return new Promise((resolve, reject) => {
  const StepsUrl = {
    url: `https://api.inews.qq.com/activity/v1/activity/info/get?activity_id=${actid}&${ID}`,
   headers: {Cookie: cookieVal}
  }
    $.get(StepsUrl, (error, response, data) => {
        if(logs == "true")console.log(`${cookieName}文章统计- data: ${data}`)
       totalred = JSON.parse(data)
        if (totalred.ret == 0){
     for (i=0;i<totalred.data.award.length;i++){
   if(totalred.data.award[i].type=='article'){
       readredtotal =totalred.data.award[i].total
       readtitle =
totalred.data.award[i].title.split("，")[0].replace(/[\u4e00-\u9fa5]/g,``)
       getreadred=totalred.data.award[i].can_get
       openreadred= totalred.data.award[i].opened
       readnum = totalred.data.award[i].event_num
        }
   if(totalred.data.award[i].type=='video'){
        videoredtotal = totalred.data.award[i].total
        videotitle = totalred.data.award[i].title.split("，")[0].replace(/[\u4e00-\u9fa5]/g,``)
        getreadred = totalred.data.award[i].can_get        
        openvideored = totalred.data.award[i].opened
        videonum = totalred.data.award[i].event_num/2
        }
      }
     }
    resolve()
    })
  })
}

function openApp() {
   ID = signurlVal.match(/devid=[a-zA-Z0-9_-]+/g)
return new Promise((resolve, reject) => {
  const openUrl = {
    url: `https://api.inews.qq.com/activity/v1/activity/redpack/get?isJailbreak=0&${ID}`,
    headers: {Cookie: cookieVal},
    body: `redpack_type=free_redpack&activity_id=${actid}`
  }
   $.post(openUrl, (error, response, data) => {
       if(logs == "true")console.log(`${cookieName}每日开启- data: ${data}`)
      let opcash = JSON.parse(data)
      if(opcash.data.award.num){
       redpackres = `【每日开启】到账`+opcash.data.award.num/100+` 元 🌷\n` 
        }
      })
    resolve()
   })
}
function shareApp() {
   ID = signurlVal.match(/devid=[a-zA-Z0-9_-]+/g)
return new Promise((resolve, reject) => {
  const openUrl = {
    url: `https://gh.prize.qq.com/show/_by0n9/invPack/index.html?#/Share?info=17A2385EE6D27888DB9F9D6B0BE90EEA&referpage=defaults`,
    headers: {Cookie: cookieVal},
  }
   $.get(openUrl, (error, response, data) => {
    //$.log(`${cookieName}- data: ${data}`)
      })
    resolve()
   })
}
//阶梯红包到账
function Redpack() {
   ID = signurlVal.match(/devid=[a-zA-Z0-9_-]+/g)
return new Promise((resolve, reject) => {
  const cashUrl = {
    url: `https://api.inews.qq.com/activity/v1/activity/redpack/get?isJailbreak=0&${ID}`,
    headers: {Cookie: cookieVal},
    body: `redpack_type=article&activity_id=${actid}`
  }
   $.post(cashUrl, (error, response, data) => {
       if(logs == "true")console.log(`${cookieName}阅读红包- data: ${data}`)
        let rcash = JSON.parse(data)
            readredpack = Number()
            redpackres = ``
        if (rcash.ret == 0){
       for (i=0;i<rcash.data.award.length;i++){
        readredpack += rcash.data.award[i].num/100
            }
       if(readredpack!=0){
       redpackres += `【阅读红包】到账`+readredpack+`元 🌷\n` 
           }
         }
     resolve()
       })
   })
}

function videoPack() {
  const ID =  signurlVal.match(/devid=[a-zA-Z0-9_-]+/g)
return new Promise((resolve, reject) => {
  const cashUrl = {
    url: `https://api.inews.qq.com/activity/v1/activity/redpack/get?isJailbreak=0&${ID}`,
    headers: {Cookie: cookieVal},
    body: `redpack_type=video&activity_id=${actid}`
  }
    $.post(cashUrl, (error, response, data) => {
       if(logs == "true")console.log(`${cookieName}视频红包-data:${data}`)
        let vcash = JSON.parse(data)
            redpackres = ``
            videoredpack = Number()
        if (vcash.ret == 0){
       for (i=0;i<vcash.data.award.length;i++){
        videoredpack += vcash.data.award[i].num/100
             }
       if(videoredpack!=0){
        redpackres += `【视频红包】到账`+videoredpack+`元 🌷\n` 
          }
         }
     resolve()
      })
   })
}

//收益总计
function getTotal() {
return new Promise((resolve, reject) => {
  const totalUrl = {
    url: `https://api.inews.qq.com/activity/v1/usercenter/activity/list?isJailbreak`,
    headers: {Cookie: cookieVal}};
    $.post(totalUrl, function(error,response, data) {
    if (error) {
      $.msg("获取收益信息失败‼️", "", error)
    } else {
    if(logs == 'true')console.log("获取收益信息" +data)
     const obj = JSON.parse(data)
      subTile = '【收益总计】'+obj.data.wealth[0].title +'金币  '+"现金: " +obj.data.wealth[1].title+'元'
        }
     resolve()
      })
   })
 }
function activity() {
return new Promise((resolve, reject) => {
  const ID =  signurlVal.match(/devid=[a-zA-Z0-9_-]+/g)
  const actUrl = {
    url: `https://api.inews.qq.com/activity/v1/user/activity/get?isJailbreak=0&${ID}`,
    headers: {Cookie: cookieVal}};
    $.get(actUrl, function(error,response, data) {
    if (error) {
      $.msg("获取活动Id失败‼️", "", error)
    } else {
     //console.log("获取活动Id" +data)
     const obj = JSON.parse(data)
      actid = obj.data.activity.id
      console.log(`您的活动ID为:`+actid+`\n`)
        }
     resolve()
      })
   })
 }

function showmsg() {
 return new Promise((resolve, reject) => {
  if(readnum&&videonum){
   detail = signinfo+redpackres + `【文章阅读】已读/再读: `+ readnum +`/`+readtitle+` 篇\n`+`【阅读红包】已开/总计: `+openreadred+`/`+readredtotal+` 个🧧\n`+ `【观看视频】已看/再看: `+ videonum +`/`+videotitle+` 分钟\n`+`【视频红包】已开/总计: `+openvideored+`/`+videoredtotal+` 个🧧\n【每日一句】`+Dictum
  }
console.log(subTile+`\n`+detail)
 if(notifyInterval==1){
   $.msg(cookieName,subTile,detail,{ "open-url": "https://news.qq.com/FERD/cjRedDown.htm" })
  }
   else if
(openvideored%notifyInterval==0&&videocoins=="红包+1"){
   $.msg(cookieName,subTile,detail,{ "open-url": "https://news.qq.com/FERD/cjRedDown.htm" } )
  }
   else if (openreadred==readredtotal&&openvideored==videoredtotal){
   $.msg(cookieName+` 今日任务已完成✅`,subTile,detail)
  }
 })
resolve()
}

// prettier-ignore
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient}isLoon(){return"undefined"!=typeof $loon}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.exists$nc(t),i=!e&&this.fs.exists$nc(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFile$nc(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.exists$nc(t),i=!e&&this.fs.exists$nc(s),o=JSON.stringify(this.data);e?this.fs.writeFile$nc(t,o):i?this.fs.writeFile$nc(s,o):this.fs.writeFile$nc(t,o)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return e;return o}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),o=e?this.getval(e):"";if(o)try{const t=JSON.parse(o);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(s),h=this.getval(i),a=i?"null"===h?null:h||"{}":"{}";try{const s=JSON.parse(a);this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i),console.log(`${i}: ${JSON.stringify(s)}`)}catch(s){const h={};this.lodash_set(h,o,t),e=this.setval(JSON.stringify(h),i),console.log(`${i}: ${JSON.stringify(h)}`)}}else e=$.setval(t,s);return e}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status,s(t,e,i))}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookie$nc(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t))}}msg(s=t,e="",i="",o){const h=t=>!t||!this.isLoon()&&this.isSurge()?t:"string"==typeof t?this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0:"object"==typeof t&&(t["open-url"]||t["media-url"])?this.isLoon()?t["open-url"]:this.isQuanX()?t:void 0:void 0;this.isSurge()||this.isLoon()?$notification.post(s,e,i,h(o)):this.isQuanX()&&$notify(s,e,i,h(o)),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.message)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}
