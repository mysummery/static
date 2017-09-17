/* added by 张明月 at 2016.11.18 for 修改选中样式 begin */
var orderid = getQueryString('orderid');
var beicode; //被邀请码
var shareTag = 2; //getQueryString("shareTag");
var token = getQueryString("token");
var uid = getCookie("cookie_brsy_h5_uid");
var mycode = getCookie("cookie_brsy_h5_mycode");
var xuliehaoType = 1; //getQueryString("xuliehaoType");
var obj;//会员标志
function check_input(a) {
	$(a).prop('checked', 'true');
	$('input_check').not(a).prop('checked', 'false');
}

function label(a) {
	var label = $(a).find('label');
	$(label).addClass('checked');
	$('#value').val($(label).attr('value'));
	$('label').not($(label)).removeClass('checked');
	var b = $(label).siblings('input');
	b.prop('checked', 'true');
	$('input_check').not(b).prop('checked', 'false');
}
ajaxPostAsyncData_share(slectInfoByUid, {
		"token": token,
		"uid": uid,
		"type": 1
	}, true, function(data) {
		if(data.code == "40000") {
			obj = data.resobj.vipstate;
			beicode = data.resobj.parentcode;
			usertype = data.resobj.usertype;
			
		}
	}, 'json')
	/* added by 张明月 at 2016.11.18 for 修改选中样式 end */

//确认
function queren() {

	if(obj == "2") {
		window.location.href = "/static/forAPP/share.html?mycode=" + mycode;
	} else {
		/* modified by 张明月 at 2016.11.18 for 修改value获取方式（因为布局改变了） begin */
		var value = $("#value").val();
		//alert(value);
		/* modified by 张明月 at 2016.11.18 for 修改v	alue获取方式（因为布局改变了） end */
		if("2" == value) {

			var redirectUri = escape(api + "/static/wechat/src/service/tiaozhuan/subscribe_scope.html?arg=" + uid + ":" + mycode + ":" + beicode + ":" + orderid + ":1" + ":" + shareTag + ":" + token + ":" + "vip");
			var action_getCodeByUserInfo = weixingz_auth + "?redirectUri=" + redirectUri + "&scope=snsapi_userinfo";
			//console.log(action_getCodeByUserInfo);
			//alert(redirectUri)
			window.location.href = action_getCodeByUserInfo;

		} else if("3" == value) { //激活码充值

			window.location.href = "/static/wechat/src/service/apliy/serialpay_weixin.html?token=" + token + "&uid=" + uid + "&orderId=" + orderid;

		}
		/* added by 张明月 at 2016.11.18 for 增加易宝支付 begin */
		else if("4" == value) {

			ajaxPostAsyncData_share(yeepay_sign, {
				"token": token,
				"uid": uid,
				"orderId": orderid, //订单号
				"channelType": "APP"
			}, false, function(datas) {
				if(datas.code == "40000") {
					var obj = datas.resobj;
					window.location.href = obj;
				}else{
					$.jBox.tip(data.info, "error");
				}
			}, 'json');

		} /* added by 张明月 at 2016.11.18 for 增加易宝支付 end */
		else {
			alert("选项有误！");
		}
	
}
}

//取消遮罩层
function close_() {
	$(".zhe_").hide();
}

//function onBridgeReady(obj) {
//
//	WeixinJSBridge.invoke(
//		'getBrandWCPayRequest', {
//			"appId": appid, //公众号ID，由商户传入  
//			"timeStamp": obj.timeStamp, //时间戳，自1970年以来的秒数
//			"nonceStr": obj.nonceStr, //支付签名随机串，不长于 32 位
//			"package": obj.package, //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//			"signType": obj.signType, //微信签名方式：MD5
//			"paySign": obj.paySign //微信支付签名
//		},
//
//		function(res) {
//			if(res.err_msg == "get_brand_wcpay_request:ok") {
//				var beicode = $("#mycode").val();
//				setCookie('cookie_brsy_h5_huiyuan', '2', 7);
//				window.location.href = "/static/wechat/src/index/shipin_index.html"; //支付成功，跳转的页面
//			} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//		}
//	);
//}

function return1() {
	window.location.href = "/static/wechat/src/self/self_center.html?openid=" + openid;
}