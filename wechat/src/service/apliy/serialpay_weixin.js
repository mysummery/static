//序列号支付
function serialPay() {

	var uid = getQueryString("uid");
	var orderId = getQueryString("orderid"); //订单号
	var token = getQueryString("token");
	var beicode;
	var serialNum = $("#serialNum").val(); //序列号
	var obj;
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": "1"
	}, false, function(data) {
		if(data.code == "40000") {
			beicode = data.resobj.parentcode; //被邀请码
			obj = data.resobj.vipstate; //是否会员
		}
	}, 'json')
	if(orderId != '' && orderId != undefined && orderId != null) {

		if(obj == "2") {
			setCookie('cookie_brsy_h5_huiyuan', obj, 7);
			window.location.href = "/static/wechat/src/index/shipin_index.html";
		} else {
			//激活码充值
			ajaxPostAsyncData(payxuliecode, {
				"uid": uid,
				"orderId": orderId,
				"code": serialNum
			}, false, function(data) {
				if(data.code == "40000") {
					setCookie('cookie_brsy_h5_huiyuan', '2', 7);
					window.location.href = "/static/wechat/src/index/shipin_index.html";
				} else {
					$.jBox.tip("激活码错误!", "error");
				}
			}, 'json')
		}

	}
	//
	else {
		var checknumber = https_domain + "/order/check/code"; //判断序列号是否存在

		ajaxPostAsyncData_share(checknumber, {
			"code": serialNum
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				ajaxPostAsyncData_share(orderSave, {
					"token": token,
					"uid": uid,
					"total": "365",
					"type": "1",
					"parentCode": beicode,
					"xuliehaoType": "0" //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
				}, false, function(data) {
					if(data.code == "40000") {
						orderId = data.resobj.id;
						//beicode=data.resobj.parentcode;
						if(obj == "2") {
							setCookie('cookie_brsy_h5_huiyuan', obj, 7);
							window.location.href = "/static/wechat/src/index/shipin_index.html";
						} else {
							//激活码充值
							ajaxPostAsyncData(payxuliecode, {
								"uid": uid,
								"orderId": orderId,
								"code": serialNum
							}, false, function(data) {
								if(data.code == "40000") {
									setCookie('cookie_brsy_h5_huiyuan', '2', 7);
									window.location.href = "/static/wechat/src/index/shipin_index.html";
								} else {
									$.jBox.tip("激活码错误!", "error");
								}
							}, 'json')
						}

					} else {
						$.jBox.tip(data.info, "error");
					}
				}, 'json');
			} else {

				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	}

}