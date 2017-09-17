//序列号支付
function serialPay() {
	var uid = getQueryString("uid");
	var mycode = getQueryString("mycode");
	var serialNum = $("#serialNum").val();
	var token = getCookie("cookie_brsy_h5_token");
	if(serialNum == '') {
		$.jBox.tip("激活码不能为空!", "error");
		return;
	} else {
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"updateVersion": "V2.0",
			"token": 　token
		}, false, function(data) {
			if(data.code == "40000") {
				var obj = data.resobj.huiyuan;
				if(obj == "2") {
					window.location.href = "/static/forAPP/share.html?mycode=" + mycode;
				} else {
					//激活码充值
					ajaxPostAsyncData(payxuliecode, {
						"uid": uid,
						"xuliecode": serialNum,
						"updateVersion": "V2.0",
						"token": 　token
					}, false, function(data) {
						if(data.code == "40000") {
							window.location.href = "/static/forAPP/share.html?mycode=" + mycode;
						} else {
							$.jBox.tip(data.info, "error");
						}
					}, 'json')
				}
			}
		}, 'json')
	}
}
