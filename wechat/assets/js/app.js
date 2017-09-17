/**
 *  		每位工程师都应该保持优雅的代码
 *		Every engineer should keep the elegant code
 */
//jQuery.support.cors = true
//var api = "http://dev-static.liqiang365.com"; //演练测试
//var appid = "wx3ba753e6caa82cc8";
//
//var api = "http://dev.liqiang365.com"; //测试
//var appid = "wx3ba753e6caa82cc8";
//var api = "http://www.liqiang365.com";	    //正式
//var appid = "wxf652c39f008f60f1";				

//var https_domain = "https://dev-api.liqiang365.com"; //测试
//var https_pay_domain = "https://dev-pay.liqiang365.com";

//var https_domain = "https://api.liqiang365.com"; //线上
//var https_pay_domain = "https://pay.liqiang365.com";

//var appid = "wx13f2940f7f9c9696";//测试才智的appid

var BASE = {

}
   var api = "http://test.liqiang365.com"; //演练测试
   //var appid = "wxac5e1ff42f126d62"; //灰测
   var appid = "wx13f2940f7f9c9696";//测试才智的appid
   var https_domain = "http://test-api.liqiang365.com"; //演练测试
   var https_pay_domain = "http://test-pay.liqiang365.com";

//var api = "http://10.1.1.119:8081"; //演练测试
//var https_domain = "http://10.1.1.119:8081"; //演练测试

var slide = https_domain + "/video/get/slide"; //轮播图片
var sfEnlei = https_domain + "/videocourse/list/group"; //查询大类
var selectSFenleiTwo = https_domain + "/videocourse/list/group/two"; //查询中类
var selectSFenleikc = https_domain + "/videocourse/list"; //课程列表
var selectSFenleiByzjid = https_domain + "/videocourse/detail"; //查询课程详情
var selectBykcid = https_domain + "/video/list"; //视频列表
var selectSShoucangByRyid = https_domain + "/videocollect/list"; //获取收藏
var addPlaycount = https_domain + "/video/update/playcount"; //增加播放量
var selectByzjid = https_domain + "/video/detail"; //视频详情

var groupbuystat_get = https_domain + "/groupbuystat/get"; //查询我的团购统计信息
var selectSDingdanByRyid = https_domain + "/order/list"; //查询我的订单
var insertSYinhangka = https_domain + "/userbankcard/save"; //银行卡添加
var selectSYinhangkaByRyid = https_domain + "/userbankcard/list"; //银行卡列表查询
var deleteBankCard = https_domain + "/userbankcard/delete"; //银行卡列表查询

var selectyinhangkaType = https_domain + "/bankdict/get"; //银行卡类型查询

var appSTeamBuyBrokerage = https_domain + "/groupbuybrokerage/list"; //查询我的佣金列表
var selectGiftCardByRyid = https_domain + "/groupbuy/gift"; //查询礼品卡列表
var appSTeamBuyGet = https_domain + "/groupbuy/list"; // 我的团购列表查询
var appSTeamBuySplitGet = https_domain + "/groupbuysplit/list"; //拆分列表查询
var selectSJiluInfoByzjid = https_domain + "/message/detail"; //根据消息id查询消息详情
var selectSJiluByRyidAll = https_domain + "/message/list"; // 查询我的消息 type=1是平台消息
var selectSJiluByRyidAllType = https_domain + "/message/list/type"; //type自由自合
var selectSTixian_list = https_domain + "/moneydraw/list" //提现记录列表查询
var insertSAdvice = https_domain + "/feedback/save"; //意见反馈
var updPassword = https_domain + "/userpwd/update"; //修改密码

var selectMyTuanduiBySeriesH5 = https_domain + "/userteam/list/tree"; //查询我的一级团队 
var selectMyTuanduiBySeriesH5_Two = https_domain + "/userteam/list/tree2"; //查询我的一级团队 
var selectMyTuanduiByPhone = https_domain + "/userteam/list/phone"; //查询我的一级团队 

var selectMyTuanduiByPhone2 = https_domain + "/userteam/list/phone2"; //查询我的二级团队 

var selectMyTuanduiAll = https_domain + "/userteam/sum"; //查询团队统计信息
var selectMySShouyi = https_domain + "/moneyincome/list"; //查询我的收益记录
var selectTransferRecordByUid = https_domain + "/message/list/transfer"; //转账列表查询

var transferAccount = https_domain + "/transfer/save"; //转账
var slectInfoByUid = https_domain + "/user/get"; //查询个人信息
var updateInfoByUid = https_domain + "/user/update"; //更新个人信息
var uploadImage = https_domain + "/upload/image";
var selectIdCardState = https_domain + "/user/get/idcardstate"; //查询身份证审核状态
var checkIdentifyingcode = https_domain + "/sms/check"; //验证短信验证码是否正确
var checkpicIdentifyingcode = https_domain + "/sms/checkpic"; //发送验证码之前调用
var insertSTixian = https_domain + "/moneydraw/save";
var sendCodeCheck = https_domain + "/sms/send"; //发送验证码
var save = https_domain + "/groupbuy/save"; //申请团购

var orderSave = https_domain + "/order/save"; //添加订单

var loginAjax = https_domain + "/login/in.ph" //登录
var register = https_domain + "/register/reg.ph"; //注册

var updatepassword = https_domain + "/userpwd/forget"; //忘记密码
var appSTeamBuySplitSave = https_domain + "/groupbuysplit/save"; //拆分申请

var groupbuychange = https_domain + "/groupbuychange/save"; //团购转换

var revisePay = https_domain + "/userpwd/updatepay"; //修改支付密码

var payxuliecode = https_pay_domain + "/codepay/pay";
var getUserOpenid = https_domain + "/weixingz/openid"; //获取openid
var wechatTiXian = https_pay_domain + "/wxredpacket/send"; //红包提现

var weixin_sign = https_pay_domain + "/wxpay/sign"; //微信支付
var yeepay_sign = https_pay_domain + "/yeepay/sign"; //易宝支付

var weixingz_auth = https_domain + "/weixingz/auth";
var weixingz_jsapi = https_domain + "/weixingz/jsapi";

var prize_count = https_domain + "/prize/count"; // 获取抽奖次数
var prize_record = https_domain + "/prize/record"; // 获取中奖名单
var prize_roll = https_domain + "/prize/roll"; // 摇奖

var videocollect_update = https_domain + "/videocollect/update"; //收藏/删除收藏
var videocollect_get = https_domain + "/videocollect/get"; //查询是否被收藏

//专栏
var subjectlist = https_domain + "/subject/list"; //获取专栏列表
var subjectget = https_domain + "/subject/get"; //获取专栏详情
var subjectuserget = https_domain + "/subjectuser/get"; //判断当前用户是否有资格查看此专栏内容
var subjectcourseget = https_domain + "/subjectcourse/list"; //获取专栏课程列表
var subjectvideoget = https_domain + "/subjectvideo/list/video"; //获取专栏视频列表
var subjectvideotop = https_domain + "/subjectvideo/list/top"; //视频目录
var newsubjectlist = https_domain + "/subject/listPage"; //新的专栏列表
var subjectvideogetinfo = https_domain + "/subjectcourse/get"; //专栏视频获取老师信息

var purse_password = https_domain + "/userpwd/checkpay"; //钱包管理密码
var updateplay = https_domain + "/subjectvideo/update/play"; //更新播放次数
var walletpay = https_pay_domain + "/walletpay/pay"; //余额支付

//直播接口

var livecommentlist = https_domain + "/livecomment/list"; //开播前的评论列表
var livelist = https_domain + "/live/list"; //获取直播
var liveget = https_domain + "/live/get"; //获取直播
var liveappointsave = https_domain + "/liveappoint/save"; //预约
var liveroleget = https_domain + "/live/user/role/get"; //用户身份查询
var livecommentadd = https_domain + "/livecomment/add"; //添加评论	
var livecombination = https_domain + "/live/combination"; //首页各项入口
var blocklist = https_domain + "/chat/chatroom/user/block/list"; //查询被踢的人
//众筹接口
//var api = "http://dev1.liqiang365.com"; //测试
//var appid = "wx3ba753e6caa82cc8";

//var https_domain = "http://dev-api1.liqiang365.com"; //测试
//var https_pay_domain = "http://dev-pay1.liqiang365.com";

var cfcrowfundinfo = https_domain + "/cfcrowfund/info"; //众筹详情 
var orderPreInfo = https_domain + "/cfcrowfund/orderPreInfo"; //众筹及闪电购商品规格 
var subOrder = https_domain + "/spOrder/subOrder"; //众筹订单提交
var cancelOrder = https_domain + "/spOrder/cancelOrder"; //取消订单
var delOrder = https_domain + "/spOrder/delOrder"; //删除订单
var followOrder = https_domain + "/spOrder/followOrder"; //订单跟踪
var refundApply = https_domain + "/spOrder/refundApply"; //退款申请
var goodsColor = https_domain + "/cfcrowfund/goodsColor"; //规格选颜色
var crowfundSlide = https_domain + "/cfcrowfund/slide"; //众筹首页顶部轮播
var SPcrowfundSlide = https_domain + "/cfcrowfund/spSlide"; //众筹首页顶部改版轮播
var todayRecommend = https_domain + "/cfcrowfund/recommend"; //众筹今日推荐
var latestCrowfund = https_domain + "/cfcrowfund/latest"; //最新众筹
var orderInfo = https_domain + "/spOrder/orderInfo"; //订单详情
var refundCancel = https_domain + "/spOrder/refundCancel"; //取消退款
var gotGoods = https_domain + "/spOrder/gotGoods"; //确认收货

//众筹支付
var spPaypay = https_pay_domain + "/spPay/pay"; //余额支付
var spWeChatPay = https_pay_domain + "/spWeChatPay/sign"; //微信签名
var spWeChatPaynotify = https_pay_domain + "/spWeChatPay/notify"; //微信回调
var spYiBaoPaysign = https_pay_domain + "/spYiBaoPay/sign"; //易宝签名
var spYiBaoPaynotify = https_pay_domain + "spYiBaoPay/notify"; //易宝回调

//订单列表
var listUnPay = https_domain + '/spOrder/listUnPay'; //待支付
var listPay = https_domain + '/spOrder/listPay'; //支付成功
var listFinish = https_domain + '/spOrder/listFinish'; //订单完成
var listRefund = https_domain + '/spOrder/listRefund'; //退款
var listAll = https_domain + '/spOrder/listAll'; //全部订单

//订单详情
var orderDetail = https_domain + "/order/detail"; //获取订单详情
var cancelOrder = https_domain + "/order/cancel"; //取消订单
var delOrder = https_domain + "/order/delete"; //删除订单

//闪电购
var fcPurchaselist = https_domain + "/fcPurchase/list"; //闪电购首页图片及倒计时
var sd_cancelOrder = https_domain + "/spPurchaseOrder/cancelOrder"; //闪电购取消订单
var lightningBuy = https_domain + "/fcPurchase/get"; //	闪电购详情
var superlightningDetail = https_domain + "/spGoods/get"; //	超市或闪电购商品详情
var lightningParams = https_domain + "/appParams/get"; //查询折扣接口
var spPurchaseOrder = https_domain + "/spPurchaseOrder/subOrder"; //闪电购提交订单

//超市
var spcancelOrder = https_domain + "/spMarketOrder/cancelOrder"; //超市取消订单
var spOrderGetSellCount = https_domain + "/spOrder/get/sellCount"; //获取超市已售数量
var spMarketget = https_domain + "/spMarket/get"; //超市详情
var spMarketlist = https_domain + "/spMarket/list"; //超市商品列表

//小微店
var getMonery=https_domain + "/microuser/getMonery";//根据uid获取开通费用
var couponlist=https_domain + "/coupon/list";//现金券列表
var couponget=https_domain + "/coupon/get";//现金券详情
var cashcouponpaypay=https_pay_domain + "/cashcouponpay/pay";//现金券支付
var cancelMicrouser = https_domain + '/microuser/cancel';//确定取消微店
var commissionSum = https_domain + "/commission/sum"; //获取微店信息
var couponList = https_domain + "/couponaccount/list"; //现金券流水查询
var commissionList = https_domain + "/commission/list"; //佣金列表查询

//商城注册
var register_shop = https_domain + "/register/reg_shop"; //商城注册

/**
 * 获取URL参数
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return unescape(r[2]);
	return null;
}

function getRequest() {
	var url = window.location.search; //获取url中"?"符后的字串   
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/*
 * ajax封装 
 */

function ajaxPostAsyncData(url, data, async, successfn, complate) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	data['updateVersion'] = "V2.0";
	data['clientType'] = "1";
	var date=new Date(); 
	var result=date.toLocaleString()+date.getMilliseconds(); 
	data['device_time'] = result;
	data['channel'] = 'H5';

	if(getCookie('isLogin') == "2") {
		if(getCookie('cookie_brsy_h5_token') == "null" || !getCookie('cookie_brsy_h5_token')) {
			clearCookie();
		} else {
			data['token'] = getCookie('cookie_brsy_h5_token');

		}
	}

	var ajaxTimeoutTest = $.ajax({
		type: "post",
		data: data,
		timeout: 5000,
		async: async,
		url: url,
		dataType: "json",
		beforeSend: function(XMLHttpRequest) {},
		success: function(d) {

			//if(d.code == "40002") {
			//	return;
			//}
			//successfn(d);
			if(d.code == "40000") {
				successfn(d);
			} else if(d.code == "40003") { //token有误
				var code = getQueryString("code");
				$.jBox.tip("为了获取更好的体验，建议您先登录！", "error");
				setTimeout(function() {
					window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
				}, 2000)
			} else if(d.code == "40008" && getCookie('cookie_brsy_h5_token') == null) { //参数有误 
				var code = getQueryString("code");
				$.jBox.tip("为了获取更好的体验，建议您先登录！", "error");
				setTimeout(function() {
					window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
				}, 2000)

			} else {
				//				$.jBox.tip("失败!" + d.info, "error");
				successfn(d);
				return;
			}
		},
		complete: function(XMLHttpRequest, textStatus) {
			//			if(complate) {
			//				complate(XMLHttpRequest, textStatus);
			//			};

			if(textStatus == 'timeout' || textStatus == 'error') { //超时,status还有success,error等值的情况
				complate(XMLHttpRequest);
			}
		},
		error: function(e) {}
	});
};

/*
 * ajax封装 
 */

function ajaxPostAsyncData_share(url, data, async, successfn, complate) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	data['updateVersion'] = "V2.0";
	data['clientType'] = "1";
	var date=new Date(); 
	var result=date.toLocaleString()+date.getMilliseconds(); 
	data['device_time'] = result;
	data['channel'] = 'H5';

	var ajaxTimeoutTest = $.ajax({
		type: "post",
		data: data,
		timeout: 5000,
		async: async,
		url: url,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		beforeSend: function(XMLHttpRequest) {},
		success: function(d) {
			successfn(d);
			//alert(d.code);
			/*if(d.code == "40000") {
				successfn(d);
				return;
			} else {
				$.jBox.tip("失败!" + d.info, "error");
				return;
			}*/
		},
		complete: function(XMLHttpRequest, textStatus) {
			//			if(complate) {
			//				complate(XMLHttpRequest, textStatus);
			//			};

			if(textStatus == 'timeout' || textStatus == 'error') { //超时,status还有success,error等值的情况
				complate(XMLHttpRequest);
			}
		},
		error: function(e) {}
	});
};
//$.support.cors = true;
//webajax封装
function ajaxWebPostAsyncData(url, data, async, successfn, complate) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	data['updateVersion'] = "V2.0";
	data['clientType'] = "1";
	if(getCookie('isLogin') == "2") {
		if(getCookie('cookie_brsy_pc_token') == null) {
			clearCookie();
		} else {
			data['token'] = getCookie('cookie_brsy_pc_token');

		}
	}
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
		document.write("<div style=\"position:absolute;top:35%;left:30%;width:40%;text-align:center;font-size:30px;\">当前浏览器版本太低，请升级IE10及以上版本<br/>或使用其他浏览器！<br/>（推荐chrome、Firefox）</div>");
	} else {
		//jQuery.support.cors = true;
		var ajaxTimeoutTest = $.ajax({
			crossDomain: true,
			//		dataType:'jsonp',
			type: "post",
			data: data,
			timeout: 5000,
			async: async,
			url: url,
			dataType: "json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend: function(XMLHttpRequest) {},
			success: function(d) {
				//if(d.code == "40002") {
				//	return;
				//}
				//successfn(d);
				//d = JSON.parse(d);
				if(d.code == "40000") {
					successfn(d);
				} else if(d.code == "40003") { //token有误
					var code = getQueryString("code");
					$.jBox.tip("为了获取更好的体验，建议您先登录！", "error");
					setTimeout(function() {
						window.location.href = "/static/pc/src/admin/login/new_login.html";
					}, 2000)
				} else if(d.code == "40008" && getCookie('cookie_brsy_pc_token') == null) { //参数有误 
					var code = getQueryString("code");
					$.jBox.tip("为了获取更好的体验，建议您先登录！", "error");
					setTimeout(function() {
						window.location.href = "/static/pc/src/admin/login/shipin/new_login.html";
					}, 2000)

				} else {
					//				$.jBox.tip("失败!" + d.info, "error");
					successfn(d);
					return;
				}
			},
			complete: function(XMLHttpRequest, textStatus) {
				//			if(complate) {
				//				complate(XMLHttpRequest, textStatus);
				//			};

				if(textStatus == 'timeout' || textStatus == 'error') { //超时,status还有success,error等值的情况
					complate(XMLHttpRequest);
				}
			},
			error: function(XMLHttpRequest, txtStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
}

/**
 * Cookie 操作
 */
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function setCookie(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期  
	document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
	return true;

}
//清理cookie
function clearCookie() {

	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + "=;expires=" + (new Date(0)).toUTCString() + ";path=/";
	}
	var code = getQueryString("code");
	window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
}

function clearCookie_new() {

	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + "=;expires=" + (new Date(0)).toUTCString() + ";path=/";
	}
}

function deleteCookie(name) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = name + "=v; expires=" + date.toGMTString();
}

/**
 * Scroll刷新
 */
var myScroll;
function loaded() {
	//定义一系列变量
	// if(!page == "1") {
	// 	var myScroll;
	// }

	var upIcon = $("#up-icon");
	var downIcon = $("#down-icon");
	//new一个iscroll对象
	myScroll = new IScroll('#wrapper', {
		probeType: 3,
		click: true,
		mouseWheel: true,
		preventDefaultException: {
			tagName: /^(INPUT|P)$/
		}

	});

	myScroll.on("scroll", function() {
		var y = this.y; //拉的距离（负数）
		//console.log(y)
		var maxY = this.maxScrollY - y; //整个页面高度-拉的距离=整个页面高度
		//console.log(maxY)
		var downHasClass = downIcon.hasClass("reverse_icon");
		var upHasClass = upIcon.hasClass("reverse_icon");
		if(y >= 40) {
			!downHasClass && downIcon.addClass("reverse_icon");
			return "";
		} else if(y < 40 && y > 0) {
			downHasClass && downIcon.removeClass("reverse_icon");
			return "";
		}

		if(maxY >= 40) {
			!upHasClass && upIcon.addClass("reverse_icon");
			return "";
		} else if(maxY < 40 && maxY >= 0) {
			upHasClass && upIcon.removeClass("reverse_icon");
			return "";
		}
	});

	//自定义上拉刷新
	myScroll.on("slideUp", function() {

		if(this.maxScrollY - this.y > 40) {
			console.log('调用')
			getdataafter();
			upIcon.removeClass("reverse_icon");
			setTimeout(function() {
				myScroll.refresh()
			}, 300)

		}
	});

	setTimeout(function() {
		myScroll.refresh()
	}, 300)
}

function hhhh() {

}