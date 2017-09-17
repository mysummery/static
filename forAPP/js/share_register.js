var openid = "";
$(function() {
	var obj = getRequest();
	$("#beicode").html(obj.mycode);
	if(obj.name == "" || obj.name == null){
		$("#yaoqingren").html("");
	}else{
		$("#yaoqingren").html(obj.name);
	}
	
	//alert(location.href.split('#')[0]);
	$(document).ready(function() {
		//alert(location.href.split('#')[0]);
		var action_jsapi_config = weixingz_jsapi + "?url=" + encodeURIComponent(location.href.split('#')[0]);
		$.getJSON(action_jsapi_config, null, function(json) {
			//alert(json);
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
		alert('没有足够的邀请码，请联系你的邀请人！');
	});
	$('.close').click(function() {
		$('.share_payFail').hide();
		$('.hide').hide();
	});
	$('.rePay').click(function() {
		$('.hide').show(); //打开遮盖
		$('.share_loading').show();
		$('.share_payFail').hide();
		var code = getQueryString('code');
		var xuliehaoType = getQueryString('xuliehaoType');
		var uid = getCookie('uid');
		var beicode = $("#beicode").html();
		wxPay(uid, openid, xuliehaoType, beicode);
	});

	$('.href_rePay').click(function() {

		//					alert("您之前已注册过李强365，请去微信公众号或APP进行升级!");
		var obj = getRequest();
		var rurl = encodeURIComponent(api + "/static/forAPP/pay/share_login.html?mycode=" + obj.mycode + "&name=" + obj.name + "&xuliehaoType=" + obj.xuliehaoType);
		window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
			appid +
			"&redirect_uri=" +
			rurl +
			"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	});
	$('.href_close').click(function() {
		$('.share_href').hide();
		$('.hide').hide();
	});
})

function selectCodeCheck() {
	var time = new Date().getMilliseconds();
	$('#imgCheckCode').attr('src', https_domain + '/validcode/get?ver=' + time);
}

/**
 * 获取手机验证码
 */
function getCheckcode() {
	
	//var java_checkCode = getCookie('cookie_brsy_pic_code');
	//var checkCodeImg = $('.register_imgCode').val();
	

	var account = $(".register_account").val();
	var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	var obj = $('#obj').val();
	var testcheck = https_domain + "/sms/checkpic";
		ajaxPostAsyncData(testcheck, {
			"account": account,
			"share_tag": 2 
		}, false, function(data) {
	
			if(data.code == "40000") {
				var obj = data.resobj;
				$('#obj').val(obj);
				if(obj == 1) {
					//selectCodeCheck();
					$('.hidecode').show();
				}
			}
		}, 'json')
	if(obj == 1) {
		var java_checkCode = getCookie('cookie_brsy_pic_code');
		var checkCode = $('#c_checkCode').val();
		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		if($('#c_checkCode').val().length!=4){
			//alert($('#c_checkCode').val().length);
			$.jBox.tip("图片验证码是4位！", "error");
			selectCodeCheck();
			//$("#password").val('');
			$("#c_checkCode").val('');
			//$('#checkcode').val('');
			return;
		}
		var sendCodeCheck = https_domain + "/sms/send_h5";
		ajaxPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "1",
			"code": checkCode,
			"codeKey": java_checkCode,
			"share_tag": 2 
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {
				selectCodeCheck();
				$("#password").val('');
				$("#c_checkCode").val('');
				$('#checkcode').val('');
				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	} else {
		var sendCodeCheck = https_domain + "/sms/send_h5";
		//alert(sendCodeCheck);
		ajaxPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "1",
			"code": '',
			"codeKey": '',
			"share_tag": 2 
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {
				selectCodeCheck();
				$("#password").val('');
				$("#c_checkCode").val('');
				$('#checkcode').val('');
				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	}
}
function goLogin(){
	var obj = getRequest();
	var rurl = encodeURIComponent(api + "/static/forAPP/pay/share_login.html?mycode=" + obj.mycode + "&name=" + obj.name + "&xuliehaoType=" + obj.xuliehaoType);
		window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
			appid +
			"&redirect_uri=" +
			rurl +
			"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	 //window.location.href = "/static/forAPP/pay/share_login.html?mycode=" + obj.mycode + "&name=" + obj.name + "&xuliehaoType=" + obj.xuliehaoType + "&code="+obj.code;
}
function submit() {
	
	var name = $('.register_name').val(),
		account = $('.register_account').val(),
		imgCode = $('.register_imgCode').val(),
		smsCode = $('.register_Code').val(),
		password = $('.register_password').val(),
		beicode = $("#beicode").html();
/*		huiyuan = "";

	ajaxPostAsyncData(vipByMycode, {
		"mycode": beicode
	}, false, function(data) {
		if(data.code == "40000") {
			huiyuan = data.resobj.huiyuan;
		} else {
			$.jBox.tip(data.info, "error");
		}
	})

	if(huiyuan != "1") {
		$.jBox.tip("因推广人不是VIP学员，您无法注册成功！", "error");
		return;
	}*/

	if(beicode == "" || account == "" || password == "" || name == "") {
		$.jBox.tip("请完善信息", "error");
		return;
	}
	if(password.length < 6 || password.length > 20) {
		$.jBox.tip("密码是6~20位数字或者字母!", "error");
		return;
	}
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	if($('.hidecode').css('display')!='none') {
		var piccode = $('#c_checkCode').val();
		var codeKey = getCookie('cookie_brsy_pic_code');
	} else {
		var piccode = '';
		var codeKey = '';
	}
	ajaxPostAsyncData(register, {
		"parentcode": beicode,
		"account": account,
		"username": name,
		"password": password,
		"codesms": smsCode,
		"piccode":$('.register_imgCode').val(),
		"codeKey":getCookie('cookie_brsy_pic_code'),
		"share_tag": 2 
	}, true, function(data) {
		$('.hide').show(); //开启遮盖
		$('.share_loading').show();
		if(data.code == "40000") { //检查注册

			//	$.jBox.tip("注册成功!", "success");
			ajaxPostAsyncData(loginAjax, {
				"account": account,
				"password": password,
				"oneType" : "1" // 0 是非单点登录 ， 1是单点登录
			}, false, function(data) {
				if(data.code == "40000") { //登录login 设置token
					setCookie('token', data.resobj.token, 7);
					var uid = data.resobj.id;
					setCookie('uid', uid, 7);
					//setCookie('cookie_brsy_h5_uid', uid, 7);
					var code = getQueryString('code');
					var xuliehaoType = getQueryString('xuliehaoType');
					var action_getOpenid = getUserOpenid + "?code=" + code;
					$.getJSON(action_getOpenid, null, function(json) {
						openid = json.openid;
						wxPay(uid, openid, xuliehaoType, beicode);
					});
				}
			}, 'json')
		} else if(data.info == "该账号已经注册") { //已经注册
			$('.share_loading').hide();
			$('.share_href').show();
			selectCodeCheck();
			$("#password").val('');
			$("#c_checkCode").val('');
			$('#checkcode').val('');

		} else {
			$('.hide').hide(); //关闭遮盖
			$('.share_loading').hide();
			selectCodeCheck();
			$.jBox.tip("注册失败!" + data.info, "error");
			$("#password").val('');
			$("#c_checkCode").val('');
			$('#checkcode').val('');
		}
	}, 'json')
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
		"xuliehaoType": xuliehaoType //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
	}, false, function(data) {
		if (data.code == "40000") {
			var orderId = data.resobj.id;
			var actions = weixin_sign;
			ajaxPostAsyncData_share(actions, {
				"token": getCookie('token'),
				"uid": uid,
				"openid": openid,
				"orderId": orderId,
				"channelType": "H5",
				"share_tag": 2
			}, true, function(datas) {
					var obj = datas.resobj;
					if(datas.code == "40010"){
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
				//var orderid=data.resobj;
				//window.location.href="/static/wechat/src/self/indent/indent_detail.html?orderid="+orderid;
				$.jBox.tip("您已经下过单了，去公众号或者APP的个人中心支付吧。", "error");			
				} else {
			$.jBox.tip("生成订单失败!" + data.info, "error");
		}

	}, 'json');

}
function picture_check() {
	var account = $(".register_account").val();
	//alert(account);
	//alert(account);
	var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
		var re = new RegExp(regu);
		if(!re.test(account)) {
			$.jBox.tip("手机号格式不正确", "error");
			return;
		}
		//var testcheck = "https://dev-api.liqiang365.com/sms/checkpic";
		
	
	
}
selectCodeCheck();