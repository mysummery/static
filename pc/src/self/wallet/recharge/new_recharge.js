$(function() {
	$(".purse").addClass("current");
});

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


function queren() {
	var uid = getCookie('cookie_brsy_pc_uid');
	var parentcode = getQueryString("parentcode");
	var usertype = getQueryString("usertype");
	var money = $("#recharge").val();
	if(money == "") {
		$.jBox.tip('充值金额不能为空', 'error');
		return false;
	}
	var value = $("#value").val();
	if(value == 1) {
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "2",

		}, false, function(data) {
			
			if(data.code == "40000") {} else {

				$.jBox.tip("生成订单失败！" + data.info, "error");
				
			}

		}, 'json')
	} else if(value == 2) {
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "2",
		}, false, function(data) {
			if(data.code == "40000") {
				var token = getCookie('cookie_brsy_pc_token');
				$("#purse").val("purse");
				var chongzhi = $("#purse").val();
				setCookie('cookie_brsy_pc_chongzhi', chongzhi, 7);
				var value1 = getCookie('cookie_brsy_pc_chongzhi');
				var resdata = data.resobj;
				var oid = resdata.id;
				var updateVersion = "V2.0";
				window.open("new_alipaypc.html?uid=" + uid + "&oid=" + oid + "&version=" + updateVersion + "&token=" + token + "");
			} else {

				$.jBox.tip("生成订单失败！" + data.info, "error");
				
			}

		}, 'json')
	} else if(value == 3) {
	
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "2",

		}, false, function(data) {

			if(data.code == "40000") {
				//如果未绑定银行卡
				var resdata = data.resobj;
				var token = getCookie('cookie_brsy_pc_token');
				if(resdata == '') {
					$.jBox.tip("请先绑定银行卡！", "error");
				} else {
					//易宝支付
					ajaxPostAsyncData_share(yeepay_sign, {
						"token": token,
						"uid": uid,
						"orderId": data.resobj.id, //订单号
						"channelType": "H5"
					}, false, function(datas) {
						
						if(data.code == "40000") {
							var obj = datas.resobj;
							var chongzhi = $("#purse").val();
							setCookie('cookie_brsy_pc_chongzhi', chongzhi, 7);
							var value1 = getCookie('cookie_brsy_pc_chongzhi');
							window.open(obj);
						}
					}, 'json');
				}

			} else {

				$.jBox.tip("生成订单失败！" + data.info, "error");
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