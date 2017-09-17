
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

function chizhi() {
	//		调用checkpic接口
	var account = getCookie('cookie_brsy_pc_account');
	var money = $("#recharge").val();
	if(isNaN(money)) {
		$.jBox.tip('请填写正确的金额', 'error');
		return false;
	} else if(money <= 0) {
		$.jBox.tip('金额不能小于0', 'error');
		return false;
	}
	
}




function queren() {
	var uid = getCookie('cookie_brsy_pc_uid');
	var parentcode = getQueryString("parentcode");
	var usertype = getQueryString("usertype");
	var money = $("#recharge").val();
	console.log(money);
	var value = $("#value").val();
	console.log(value);
   if (value==1){
   	ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "2",

		}, false, function(data) {
			alert(data.code);
			if(data.code == "40000") {
					
					console.log(data);
				} else {
				
					$.jBox.tip("生成订单失败！" + data.info, "error");
				}

		}, 'json')
   }else if(value == 2) {
		ajaxWebPostAsyncData(orderSave, {
			"uid": uid,
			"parentCode": parentcode,
			"xuliehaoType": usertype,
			"total": money,
			"type": "2",

		}, false, function(data) {
			
			if(data.code == "40000") {
				var token = getCookie('cookie_brsy_pc_token');
				var resdata = data.resobj;
				var oid = resdata.id;
				var updateVersion = "V2.0";
				window.open("/static/login/shipin/new_alipaypc.html?uid="+uid+"&oid="+oid+"&version="+updateVersion+"&token="+token+"");/*
					window.location.href = "/static/login/shipin/new_alipaypc.html?uid="+uid+"&oid="+oid+"&version="+updateVersion+"&token="+token+"";*/
				} else {
				
					$.jBox.tip("生成订单失败！" + data.info, "error");
				}

		}, 'json')
	}else if (value == 3){
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
				if(resdata == ''){
					$.jBox.tip("请先绑定银行卡！", "error");
				}else{
					//易宝支付
					ajaxPostAsyncData_share(yeepay_sign, {
						"token":token,
						"uid": uid,
						"orderId":data.resobj.id,//订单号
						"channelType": "H5"
					}, false, function(datas) {
						if(data.code == "40000") {
							var obj = datas.resobj;
							window.location.href = obj;
						}
					}, 'json');
				}
					
			} else {
				
				$.jBox.tip("生成订单失败！" + data.info, "error");
			}

		}, 'json')
	}
	
}