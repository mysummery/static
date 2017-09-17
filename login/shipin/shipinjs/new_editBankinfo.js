$(function() {
		
$("#cardNum").blur(function() {
	var cardNum = $("#cardNum").val();
		var subcardNum = cardNum.substr(0, 6);
		ajaxWebPostAsyncData(selectyinhangkaType, {
			"cardnum": subcardNum
		}, false, function(data) {
		
			if(data.code == "40000") {
				console.log(data);
				var cardtype = data.resobj.cardtype;
				var parentbank = data.resobj.parentbank;
				$("#cardType").val(cardtype);
				$("#parentbank").val(parentbank);
			}
		}, 'json')

	})
	
})

	function bankreserve() {
	var uid=getCookie('cookie_brsy_pc_uid');

		var cardNum = $("#cardNum").val();
		console.log(cardNum);
		if(cardNum == "") {
		$.jBox.tip("银行卡号不能为空", "error");
		return false;
	}
		
 var bankPhone = $("#bankPhone").val();

	if(bankPhone == "") {
		$.jBox.tip("手机号不能为空!", "error");
		return false;
	}
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(bankPhone)) {
		$.jBox.tip("手机号格式不正确", "error");
		return false;
	} else if(bankPhone.length != 11) {
		$.jBox.tip('必须是正确的手机号', 'error');
		return false;
	}
	
	var bank = $("#bank").val();
	 
	var cardtype = $("#cardType").val();	
	
	var parentbank = $("#parentbank").val();
  var chikaren =  $(".idcardname").html();

	if(bank == "") {
		$.jBox.tip("开户行不能为空", "error");
		return false;
	} else if(bank.length > 30) {
		$.jBox.tip("不能超过30个汉字", "error");
		return false;
	}
		ajaxWebPostAsyncData(insertSYinhangka, {
			"uid": uid,
			"cardholder":chikaren,
			"cardnum":cardNum,
			"bank":bank,
			"parentbank":parentbank,
			"phone":bankPhone,
			"cardtype":cardtype
		}, false, function(data) {
			if(data.code == "40000") {
			$.jBox.tip("添加成功!", "success");
			}else {
				$.jBox.tip("添加失败!" + data.info, "error");
			}
		}, 'json')
	
	}