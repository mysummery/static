//切换input状态
function check_input(a) {
	$(a).attr('checked', 'true');
	$('input_check').not(a).attr('checked', 'false');
	$("#rechaReserve").removeAttr("disabled");
}
//切换label状态
function label(a) {
	var label = $(a).find('label');
	$(label).addClass('checked');
	$('#value').val($(label).attr('value'));
	$('label').not($(label)).removeClass('checked');
	var b = $(label).siblings('input');
	b.attr('checked', 'true');
	$('input_check').not(b).attr('checked', 'false');
}
//当选择邀请码时
function activeCode() {
	$('.input_check').attr('checked', false);
	$(".form label").attr('checked', false);
	$(".form label").removeClass('checked');
	$("#value").val('4');
}

var uid = getCookie('cookie_brsy_pc_uid');
ajaxWebPostAsyncData(slectInfoByUid, {
	"type": 1,
	"uid": uid
}, false, function(data) {
	if(data.code == "40000") {
		var resdata = data.resobj;
		window.usermoney = resdata.money
	}
}, 'json')

function queren() {

	var uid = getCookie('cookie_brsy_pc_uid');

	var parentcode = getCookie('cookie_brsy_pc_parentcode');

	var usertype = getCookie('cookie_brsy_pc_usertype');

	var money = $("#recharge").val();

	var value = $("#value").val();
	if(value == 1) {
		//微信
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "1",

		}, false, function(data) {

			if(data.code == "40000") {} else {

				$.jBox.tip("生成订单失败！" + data.info, "error");
			}

		}, 'json')
	} else if(value == 2) {
		//支付宝
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "1",
		}, false, function(data) {
			if(data.code == "40000") {
				var token = getCookie('cookie_brsy_pc_token');
				var resdata = data.resobj;
				var oid = resdata.id;
				var updateVersion = "V2.0";
				$("#zhifupgrade").val("zhifupgrade");
				var zhifupgrade = $("#zhifupgrade").val();
				setCookie('cookie_brsy_pc_zhifupgrade', zhifupgrade, 7);
				window.open("/static/pc/src/self/wallet/recharge/new_alipaypc.html?uid=" + uid + "&oid=" + oid + "&version=" + updateVersion + "&token=" + token + "");

			} else {
				$.jBox.tip("生成订单失败！" + data.info, "error");
			}

		}, 'json')
	} else if(value == 3) {
		//银联

		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "1",
		}, false, function(data) {
			if(data.code == "40000") {
				//如果未绑定银行卡
				var resdata = data.resobj;
				var token = getCookie('cookie_brsy_pc_token');
				if(resdata == '') {
					$.jBox.tip("请先绑定银行卡！", "error");
				} else {
					//易宝支付
					$("#rechaReserve").attr('disabled', "true");
					ajaxWebPostAsyncData(yeepay_sign, {
						"token": token,
						"uid": uid,
						"orderId": data.resobj.id, //订单号
						"channelType": "H5"
					}, false, function(data) {
						if(data.code == "40000") {
							var obj = data.resobj;
							$("#zhifupgrade").val("zhifupgrade");
							var zhifupgrade = $("#zhifupgrade").val();
							setCookie('cookie_brsy_pc_zhifupgrade', zhifupgrade, 7);
							window.open(obj);

						} else {
							$.jBox.tip(data.info, "error");
						}
					}, 'json');
				}
			} else {
				$.jBox.tip("生成订单失败！" + data.info, "error");
			}

		}, 'json')
	} else if(value == "4") {

		var code = $('#jihuo').val();
		if(code == "") {
			$.jBox.tip("请选择支付方式!", "error");
			return false;
		}
		var regu = /^[A-Za-z0-9]+$/;
		var re = new RegExp(regu);
		if(!re.test(code)) {
			$.jBox.tip('激活码为字母与数字的组合', 'error');
			return false;
		}
		//激活码
		$("#rechaReserve").attr('disabled', "true");
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": 0,
			"total": money,
			"type": "1",
		}, false, function(data) {

			if(data.code == "40000") {
				var token = getCookie('cookie_brsy_pc_token');
				var resdata = data.resobj;
				var orderId = resdata.id;
				var code = $('#jihuo').val();
				ajaxWebPostAsyncData(payxuliecode, {
					"uid": uid,
					"orderId": orderId,
					"code": code
				}, false, function(data) {
					if(data.code == "40000") {
						var huiyuan = "2";
						setCookie('cookie_brsy_pc_huiyuan', huiyuan, 7);
						$.jBox.tip("升级成功!", "success");
						setTimeout(function() {
							window.location.href = "/static/pc/src/self/information/new_usercenter.html";
						}, 1000)

					} else {
						$.jBox.tip(data.info, "error");
						$("#rechaReserve").removeAttr("disabled");

					}
				}, 'json');

			} else {

				$.jBox.tip("生成订单失败！" + data.info, "error");
				$("#rechaReserve").removeAttr("disabled");
			}

		}, 'json')
	} else if(value == "5") {
		//余额充值

		if(usermoney == 0) {
			$.jBox.tip("余额不足，请先进行充值", "error");
			return false;
		}
		$("#rechaReserve").attr('disabled', "true");
		
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "1",
		}, false, function(data) {

			if(data.code == "40000") {
				var token = getCookie('cookie_brsy_pc_token');
				var resdata = data.resobj;
				var orderId = resdata.id;
				ajaxWebPostAsyncData(walletpay, {
					"token": token,
					"uid": uid,
					"orderId": data.resobj.id,
					"channelType": "H5"
				}, false, function(datas) {
					if(data.code == "40000") {
						$.jBox.tip("升级成功!", "success");
						var huiyuan = "2";
						setCookie('cookie_brsy_pc_huiyuan', huiyuan, 7);

						setTimeout(function() {
							window.location.href = "/static/pc/src/self/information/new_usercenter.html";
						}, 1000)

					} else {
						$.jBox.tip(data.info, "error");
						$("#rechaReserve").removeAttr("disabled");
					}
				}, 'json');

			} else {
				$.jBox.tip("生成订单失败！" + data.info, "error");
				$("#rechaReserve").removeAttr("disabled");
			}

		}, 'json')
	}

}

function clearNoNum(obj) {
	//修复第一个字符是小数点 的情况.  
	if(obj.value != '' && obj.value.substr(0, 1) == '.') {
		obj.value = "";
	}

	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符  
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的       
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数       
	if(obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
		if(obj.value.substr(0, 1) == '0' && obj.value.length == 2) {
			obj.value = obj.value.substr(1, obj.value.length);
		}
	}
}