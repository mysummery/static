// JavaScript Document
function loaddata(){
	var obj = getRequest();
	$("#card_type").val(obj.cardtype);
	$('#bank_belong').val(obj.parentbank);
	
}
function next() {
	var chikaren = decodeURI(getCookie('cookie_brsy_h5_chikaren'), "utf-8");
	var kahao = getCookie('cookie_brsy_h5_kahao');
	//var card_type = $('#card_type').val();
	var kaihuhang = $('#bank_k').val();
	var phone = $('#bank_phone').val();
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(phone)||phone.length!=11) {
		$.jBox.tip("手机号格式不正确", "error");
		//selectCodeCheck();
		return;
	}
	//var suoshuhang = $('#bank_belong').val();
	var ryid = getCookie('cookie_brsy_h5_uid');
	var card_type = $('#card_type').val();
	var suoshuhang = $('#bank_belong').val();
	if(card_type == "" || kaihuhang == "" || phone == "" || suoshuhang == "") {
		//alert("用户名和密码不能为空!");
		$.jBox.tip("请完善信息!", "error");
		return false;
	} else {
		ajaxPostAsyncData(insertSYinhangka, {
			"cardholder": chikaren,
			"cardnum": kahao,
			"bank": kaihuhang,
			"parentbank": suoshuhang,
			"phone":phone,
			"cardtype":card_type,
			"uid": ryid
		}, false, function(data) {
			if(data.code == "40000") {
				$.jBox.tip("绑定成功!", "success");
				window.setTimeout(function() {
					window.location.href = "/static/wechat/src/self/wallet/wallet.html?uid=" + ryid;
				}, 1000);

			} else {
				$.jBox.tip("绑定失败!" + data.info, "error");
			}
		}, 'json')
	}
}
loaddata();
