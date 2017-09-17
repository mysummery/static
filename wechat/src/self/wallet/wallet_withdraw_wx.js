// JavaScript Document
var uid = getQueryString("uid");

function showDivLoad() {
	document.getElementById("div_load_bg").style.display = "block";
	document.getElementById("div_load_show").style.display = "block";
}

function hideDivLoad() {
	document.getElementById("div_load_bg").style.display = 'none';
	document.getElementById("div_load_show").style.display = 'none';
}

function loadData() {
	var action = slectInfoByUid + "?uid=" + uid + "&type=1";
	ajaxPostAsyncData(action, null, true, function(data) {
		if(data.code == "40000") {
			window.money = data.resobj.money;
			$("#money").html(data.resobj.money);
		} else {
			$.jBox.tip("页面初始化失败!", "error");
		}
	}, 'json')
}

function wx_tx() {
	var money = $("#charge").val();
	var zf_password = $("#zf_password").val();
	if(money == "") {
		$.jBox.tip("请输入提现金额！", "error");
		return;
	}
	if(zf_password == undefined) {
		$('.cover').show();
		$('.tc_password').show();
	}
}

function card() {

	window.location.href = "/static/wechat/src/self/wallet/wallet_withdraw.html";
}

function confirm_password() {
	var zf_password = $("#zf_password").val();
	var action = slectInfoByUid + "?uid=" + uid + "&type=1";
	ajaxPostAsyncData(action, null, true, function(data) {
		if(data.code == "40000") {
			$("#money").html(data.resobj.money);
		} else {
			$.jBox.tip("页面初始化失败!", "error");
		}
	}, 'json')

}

function all_withdraw() {

	$("#charge").val(money);
}

function tixianSubmit() {

	//参数验证
	var money = $("#charge").val();
	var zf_password = $("#zf_password").val();
	if(money == "" || money < 1.02 || money > 200.0) {
		$.jBox.tip("请输入正确的提现金额！", "error");
		return;
	}
	if(zf_password == "") {
		$.jBox.tip("请输入密码！", "error");
		return;
	}

	var uid = getQueryString("uid");
	var code = getQueryString("code");
	var url = getUserOpenid;
	var param = {
		"code": code
	};
	showDivLoad();
	$.ajax({
		type: 'get', 
		timeout:20000,
		url: url,
		data: param,
		cache: false,
		success: function(openIdData) {
			 
			var openid = openIdData.openid;
			if(openid == null || openid == "") {
				hideDivLoad();
			}
			//提现申请
			var action = wechatTiXian;
			ajaxPostAsyncData(action, {
				"uid": uid,
				"openid": openid,
				"money": money,
				"payPwd": zf_password
			}, true, function(data) {
				console.log(uid);
				console.log(openid);
				console.log(money);
				console.log(zf_password);
				hideDivLoad();
				if(data.code == "40000") {
					alert("提现成功,红包已由公众号发放，请及时领取红包!");
					window.location.href = "/static/wechat/src/self/wallet/wallet.html";
				} else {
				
					$.jBox.tip(data.info + " 请返回上级页面稍后重试！", "error");
				}
			}, 'json')
		}
	});

}

loadData();