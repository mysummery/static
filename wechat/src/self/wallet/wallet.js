var uid = getCookie('cookie_brsy_h5_uid');

function loading() {
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type":1,
		"page": "1"
	}, false, function(data) {
		if(data.code == "40000") {
			var money = Math.round(parseFloat(data.resobj.money) * 100) / 100;
			$("#yue").html(money + "元");
		} else {
			$.jBox.tip("页面初始化失败!", "error");
		}
	}, 'json')
}

function turn() {
	window.location.href = "/static/wechat/src/self/wallet/wallet_turn.html";
}

function recharge() {

	$.jBox.tip("请到app端进行充值!", "error");
}

function mycard() {
	ajaxPostAsyncData(selectSYinhangkaByRyid, {
		"uid": uid
	}, false, function(data) {
		if(data.resobj != '') {
			window.location.href = "/static/wechat/src/self/mycard/card_list.html?uid=" + uid;;

		} else {
			window.location.href = "/static/wechat/src/self/mycard/card_bind.html";
		}
	}, 'json')

}

function tx() {
	ajaxPostAsyncData(selectSYinhangkaByRyid, {
		"ryid": uid,
		"uid": uid
	}, false, function(data) {
		if(data.resobj == '') {
			$.jBox.tip("请先绑定银行卡!", "error");
			window.setTimeout(function() {
				window.location.href = "/static/wechat/src/self/mycard/card_bind.html";
			}, 2000);

		} else {
			window.location.href = "/static/wechat/src/self/wallet/wallet_withdraw.html";
		}
	}, 'json')

}

function red_tx() {
	//var code = getQueryString("code");
	//var mycode=getCookie('cookie_brsy_h5_mycode');
	//var openid = '';
	//var url = '/appweix/getUserOpenid.ph';
	//var param = {
	//	"code": code
	//	};
	//$.ajax({
	//	type: 'post',
	//	url: url,
	//	data: param,
	//	cache: false,
	//	success: function (openIdData) {
	//	openid = openIdData.openid;
	//	window.location.href = "/static/login/shipin/wallet_withdraw_wx.html?openid=" + openid + "&mycode=" + mycode + "&uid=" + uid + "";
	//	}
	//});

	var mycode = getCookie('cookie_brsy_h5_mycode');
	var uid = getCookie('cookie_brsy_h5_uid');
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type":"1"
	}, false, function(data) {
		var rows = data.resobj;
		if(data.code == "40000") {
 			var huiyuan = rows.vipstate;
//			var deadline = data.resobj.vipendtime;
			var shenfenstatus = data.resobj.authstate;
			if(huiyuan=='1'){
				$.jBox.tip("您不是VIP用户，无法进行提现操作！", "error");
			}else{
				if(uid == null || uid == '' || typeof(uid) == 'undefined') {
					$.jBox.tip("无法获取用户信息，请重新登录！", "error");
				} else {
					var rurl = encodeURIComponent(api + "/static/wechat/src/self/wallet/wallet_withdraw_wx.html?mycode=" + mycode + "&uid=" + uid);
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						appid +
						"&redirect_uri=" +
						rurl +
						"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
				}
			}
		}
	},'json')
	
}

function income() {
	window.location.href = "/static/wechat/src/self/wallet/wallet_income.html";
}
loading();