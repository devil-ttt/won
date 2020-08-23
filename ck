# 获取Cookie订阅 By nzw9314
# 该订阅仅适用于定时签到脚本的Cookie获取. 
# 集成: NobyDa、Chavy以及个人收集常用签到脚本,其他签到脚本会陆续添加. 
# 您可以在使用后手动将其禁用，以免产生不必要的MITM.

hostname = h5.youzan.com, api.infzm.com, api.xiaoheihe.cn, exp.angelalign.com, ngabbs.com, api.umer.com.cn, app*.jegotrip.com.cn, task.jegotrip.com.cn, my.ruanmei.com, www.mydigit.cn, wx-mini.pagoda.com.cn, m.weibo.cn, apapia-history.manmanbuy.com, weather-data.apple.com, mall.oclean.com, api.cashtoutiao.com, user-api-prd-mx.wandafilm.com, h5.bianlifeng.com, teacherapi.zmlearn.com, clientaccess.10086.cn, maicai.api.ddxq.mobi, vip.heytea.com, webapi.qmai.cn, proapi.115.com, proxy.vac.qq.com, *.xmcimg.com, as.xiaojukeji.com, note.youdao.com, ios.baertt.com, xiaoshuo.qm989.com, api.m.jd.com, music.163.com, c.tieba.baidu.com, weibo.com, *.iqiyi.com, *.smzdm.com, *.v2ex.com, www.52pojie.cn, *.bilibili.com, *.feng.com, *.video.qq.com, *.acfun.cn, *.rrys2019.com, mobwsa.ximalaya.com, *.rr.tv, www.flyertea.com, wapside.189.cn:9001, sf-integral-sign-in.weixinjia.net, h5.ele.me, *.you.163.com, apk.tw, api.dongqiudi.com, *.m.163.com, user.qunar.com, yuba.douyu.com, ios.zmzapi.com, *.y.qq.com, *.csdn.net, m.ctrip.com, m.gdoil.cn, credits.bz.mgtv.com, api-takumi.mihoyo.com, act.10010.com, e.189.cn,  www.maomicd.com, wx.10086.cn, mtrace.qq.com, www.lltxt.com, weclub.ccc.cmbchina.com, promotion.waimai.meituan.com, i.meituan.com, daojia.jd.com, api-hdcj.9w9.com, api.everphoto.cn, group.baicizhan.com, maicai.api.ddxq.mobi, pm.m.fenqile.com, ms.jr.jd.com, nebula.kuaishou.com, api.dushu.io, node.kg.qq.com, app.nio.com, wxprdapplet.gac-nio.com, activity-1.m.duiba.com.cn, m.client.10010.com, m-bean.kaola.com, 110.43.90.61, zt.wps.cn, passport.suning.com, luckman.suning.com, sign.suning.com, gameapi.suning.com, m.ximalaya.com, iphone.myzaker.com, draw.jdfcloud.com, sapi.beingfine.cn, icbc1.wlphp.com, wx.17u.cn, frodo.douban.com, mcs-mimp-web.sf-express.com, gameapi.hellobike.com, mwegame.qq.com, api.1sapp.com, tieba.baidu.com, m.ximalaya.com, app.jf.360.cn, api.weibo.cn, pay.sc.weibo.com, api.inews.qq.com, newsapi.sina.cn, *.youth.cn, apiwz.midukanshu.com, www.duokan.com, appv8.qukantianxia.com, appv7.qukantx.com, xwsh.javamall.cn,glados.rocks

# NobyDa

# > GLADOS
http-request https:\/\/glados\.rocks\/api\/user\/status script-path=https://github.com/evilbutcher/Quantumult_X/raw/master/check_in/glados/glados.js, timeout=10, enabled=false, tag=GLaDOS Cookie获取

# > 京东
# 浏览器登录 https://bean.m.jd.com 点击签到并且出现签到日历
http-request https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean(Index|GroupStageIndex) max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js

# > 爱奇艺
http-request https?:\/\/.*\.iqiyi\.com\/.*authcookie= script-path=https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js


# Chavyleung

# > 百度签到
#先登录,浏览器访问一下: https://tieba.baidu.com 或者 https://tieba.baidu.com/index/
http-request ^https?:\/\/tieba\.baidu\.com\/?.? script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/tieba/tieba.cookie.js, tag=百度签到(网页)


# > 腾讯视频
# 手机浏览器访问并登录下https://film.qq.com/,随便选 1 部电影观看
http-request ^https:\/\/access.video.qq.com\/user\/auth_refresh script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.cookie.js


# > 字幕组
http-request ^https?:\/\/(www\.)?rrys2020\.com\/?.? script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/zimuzu/zimuzu.cookie.js
http-request ^http:\/\/ios.zmzapi.com\/index.php.*a=(mobile_)?login script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/zimuzu/zimuzu.cookie.js


# > 人人视频
http-request ^https:\/\/api\.rr\.tv\/user\/profile script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/rrtv/rrtv.cookie.js


# > 美团外卖
http-request ^https:\/\/promotion.waimai.meituan.com\/playcenter\/signIn\/entry script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wmmeituan/wmmeituan.cookie.js
http-request ^https:\/\/promotion.waimai.meituan.com\/playcenter\/signIn\/doaction script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/wmmeituan/wmmeituan.cookie.js,requires-body=true

# > 网易新闻
http-request ^https:\/\/(.*?)c\.m\.163\.com\/uc\/api\/sign\/v3\/commit script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/neteasenews/neteasenews.cookie.js,requires-body=true

# > QQ音乐
http-request ^https:\/\/u.y.qq.com\/cgi\-bin\/musicu.fcg requires-body=true,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/qqmusic/qqmusic.cookie.js
http-response ^https:\/\/u.y.qq.com\/cgi\-bin\/musicu.fcg requires-body=true,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/qqmusic/qqmusic.cookie.js

# > 美团
http-request ^https:\/\/i.meituan.com\/evolve\/signin\/signpost\/ script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.cookie.js,requires-body=true


# > 樊登读书
http-request ^https://api\.dushu\.io/CheckIn script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/fandeng/fandeng.cookie.js, requires-body=true


# > 苏宁易购
http-request ^https:\/\/passport.suning.com\/ids\/login$ script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js, requires-body=true
http-request ^https:\/\/luckman.suning.com\/luck-web\/sign\/api\/clock_sign.do script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js
http-request ^https:\/\/sign.suning.com\/sign-web\/m\/promotion\/sign\/doSign.do script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js
http-request ^https:\/\/gameapi.suning.com\/sngame-web\/(api\/signin\/private\/customerSignOperation.do|gateway\/api\/queryPrize.do) script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/suning/suning.cookie.js

# > 趣头条
http-request ^https:\/\/api\.1sapp\.com\/sign\/info? script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/qtt/qtt.cookie.js
http-request ^https:\/\/api\.1sapp\.com\/content\/readV2? script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/qtt/qtt.cookie.js
http-request ^https:\/\/api\.1sapp\.com\/x\/feed\/getReward? script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/qtt/qtt.cookie.js


# > 京东618
http-request ^https:\/\/api.m.jd.com\/client.action\?functionId=cakebaker_getHomeData script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/jd/jd.618.cookie.js,requires-body=true


# 其他

# > 京东成长分 (By @barrymchen)
http-request ^https:\/\/ms\.jr\.jd\.com\/gw\/generic\/bt\/h5\/m\/queryUserSignFlow script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/jdczfcookie.js

# > 工银e生活 (By @barrymchen)
http-request ^https:\/\/icbc1\.wlphp\.com:8444\/js\/api\/index\/signIn script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/icbc_cookie.js,requires-body=true


# > 电视家
http-request http:\/\/act\.gaoqingdianshi\.com\/\/api\/v4\/sign\/signin script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/dianshijia.js
http-request http:\/\/api\.gaoqingdianshi\.com\/api\/v2\/cash\/withdrawal script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/dianshijia.js

# > 微博(By @Macsuny)
http-request https:\/\/api\.weibo\.cn\/\d\/video\/machine\?gsid script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/weibo.js
# > 钱包
http-request https:\/\/pay\.sc\.weibo\.com\/aj\/mobile\/home\/welfare\/signin\/do\? script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/weibo.js

# > 腾讯新闻 (By 红鲤鱼与绿鲤鱼与驴 & @Macsuny)
http-request https:\/\/api\.inews\.qq\.com\/event\/v1\/user\/event\/report\? script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/txnews.js, requires-body=true

# > 新浪新闻(By @Macsuny)
http-request https:\/\/newsapi\.sina\.cn\/\?resource=hbpage&newsId=HB-1-sina_gold_center script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/sinanews.js
http-request https:\/\/newsapi\.sina\.cn\/\?resource=userpoint\/signIn script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/sinanews.js

# > 中青看点极速版 (By @Macsuny)
http-request https:\/\/ios\.baertt\.com\/v5\/article\/complete script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true
http-request https:\/\/\w+\.youth\.cn\/TaskCenter\/(sign|getSign) script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js
http-request https:\/\/ios\.baertt\.com\/v5\/article\/red_packet script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true
http-request https:\/\/ios\.baertt\.com\/v5\/user\/app_stay\.json script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/youth.js, requires-body=true

# > 数码之家 (By @Macsuny)  
http-request id=k_misign:sign&operation=qiandao&format=text script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/mydigit.js

# > 楼兰小说论坛 (By @iNotification)
http-request ^https:\/\/www\.lltxt\.com/hack\.php\?H_name=qiandao&action=qiandao script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/loulancheck.js

# > 招行信用卡公众号 (By @iNotification)
http-request https://weclub\.ccc\.cmbchina.com/SCRMCustomActivityFront/checkin/request/get-home-data\.json\?activityCode=checkin script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/cmbchina.js

# > 滴滴出行 (By @zZPiglet)
http-request ^https:\/\/as\.xiaojukeji\.com\/ep\/as\/toggles\? script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/DiDi/DiDi.js

# > 微博通知 (By @zZPiglet)
http-request ^https:\/\/m\.weibo\.cn\/feed\/ script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/Weibo/Weibo.js

# > 京东价格提醒(By toulanboy)
^http-request https:\/\/apapia-history\.manmanbuy\.com\/ChromeWidgetServices\/WidgetServices\.ashx script-path=https://raw.githubusercontent.com/toulanboy/scripts/master/jd_price_detect/jd_price_detect.js,requires-body=true, tag=京东价格提醒cookie获取

# > 彩云天气 (By Peng-YM)
http-request https://weather-data.apple.com script-path=https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/caiyun.js, require-body=false
