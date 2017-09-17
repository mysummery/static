var openid = "";
$(function() {
	var obj = getRequest();
	$("#beicode").html(obj.mycode);

	$(document).ready(function() {
		var action_jsapi_config = weixingz_jsapi + "?url=" + encodeURIComponent(location.href.split('#')[0]);
		$.getJSON(action_jsapi_config, null, function(json) {

			var ret = json.resobj;
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: appid, // 必填，公众号的唯一标识
				timestamp: ret.timestamp, // 必填，生成签名的时间戳
				nonceStr: ret.nonceStr, // 必填，生成签名的随机串
				signature: ret.signature, // 必填，签名，见附录1
				jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		});
	});
	wx.error(function(res) {
		alert(res);
	});
	$('.close').click(function() {
		$('.share_payFail').hide();
		$('.hide').hide();
	})
	$('.rePay').click(function() {
		$('.hide').show(); //打开遮盖
		$('.share_loading').show();
		$('.share_payFail').hide();
		var xuliehaoType = getQueryString('xuliehaoType');
		var uid = getCookie('uid');
		var beicode = $("#beicode").html();
		wxPay(uid, openid, xuliehaoType, beicode);
	})
})

function login() {
	var account = $('.register_account').val(),
		password = $('.register_password').val(),
		beicode = $("#beicode").html();

	$('.hide').show(); //打开遮盖
	$('.share_loading').show();
	ajaxPostAsyncData(loginAjax, {
		"account": account,
		"password": password,
		"share_tag": 1,
		"oneType" : "0" // 0 是非单点登录 ， 1是单点登录
	}, false, function(data) {
		if(data.code == "40000") { //登录login 设置token
			if(data.resobj.vipstate == 1) {

				setCookie('token', data.resobj.token, 7);
				var uid = data.resobj.id;
				setCookie('uid', uid, 7);

				var code = getQueryString('code');
				var xuliehaoType = getQueryString('xuliehaoType');
				if(!openid) {
					//如果为空
					var action_getOpenid = getUserOpenid + "?code=" + code;
					$.getJSON(action_getOpenid, null, function(json) {
						openid = json.openid;

						wxPay(uid, openid, xuliehaoType, beicode);
					});
				} else {
					wxPay(uid, openid, xuliehaoType, beicode);
				}

			}else {
				$('.hide').hide(); //关闭遮盖
				$('.share_loading').hide();
				$.jBox.tip("您已经是VIP学员，无需再次支付！", "error");

			}
		} else if(data.code == "40010") {
			$('.hide').hide(); //关闭遮盖
			$('.share_loading').hide();
			$.jBox.tip(data.info, "error");
		} else if(data.code == "40009") {
			$('.hide').hide(); //关闭遮盖
			$('.share_loading').hide();
			$.jBox.tip(data.info, "error");
		} else {
			$('.hide').hide(); //关闭遮盖
			$('.share_loading').hide();
			$.jBox.tip(data.info, "error");
		}

	}, function(xhr) {
		console.log(1);
		if(xhr.status == 0) {
			$('.hide').hide(); //关闭遮盖
			$('.share_loading').hide();
			$('.share_payFail').hide();
			$.jBox.tip("请求超时!", "error");
		}
	})

}

function wxPay(uid, openid, xuliehaoType, beicode) {
	//生成订单
	if (xuliehaoType == "undefined") {
		xuliehaoType = 1;
	}
	ajaxPostAsyncData_share(orderSave, {
		"token": getCookie('token'),
		"uid": uid,
		"total": "365",
		"type": "1",
		"parentCode": beicode,
		"xuliehaoType": xuliehaoType, //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
		"share_tag": 1
	}, false, function(data) {
			//alert("data.code");
		if (data.code == "40000") {
								
			var orderId = data.resobj.id;
			var actions = weixin_sign;
			ajaxPostAsyncData_share(actions, {
				"token": getCookie('token'),
				"uid": uid,
				"openid": openid,
				"orderId": orderId,
				"channelType": "H5",
				"share_tag": 1
			}, true, function(datas) {
					var obj = datas.resobj;
					if(datas.code == "40010"){
															//alert("4444444444");
						$.jBox.tip(data.info, "error");
						$('.share_payFail').hide();
						$('.hide').hide(); //关闭遮盖
						$('.share_loading').hide();
						return;
					}		
					wx.chooseWXPay({
						"timestamp": obj.timeStamp, //时间戳，自1970年以来的秒数
						"nonceStr": obj.nonceStr, //支付签名随机串，不长于 32 位
						"package": obj.package, //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						"signType": obj.signType, //微信签名方式：MD5
						"paySign": obj.paySign, //微信支付签名
						success: function(res) {
							window.location.href = "/static/forAPP/share_last.html";
						},
						cancel: function(res) {
							$('.share_loading').hide();
							$('.share_payFail').show();
						}
					});
			}, 'json');
		}else if(data.code=='40018'){
			$.jBox.tip("您已经下过单了，去公众号或者APP的个人中心支付吧。", "error");
				//var orderid=data.resobj;
				//window.location.href="/static/wechat/src/self/indent/indent_detail.html?orderid="+orderid;
							
				}else {
			$.jBox.tip("生成订单失败!" + data.info, "error");
		}
		


	}, 'json');

}