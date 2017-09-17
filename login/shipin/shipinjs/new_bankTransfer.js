$(function() {
	var account = getCookie('cookie_brsy_pc_account');
	$("#phone").val(account);
	$('.check').hide();
	$("#transmoney").blur(function() {
		
		var account = getCookie('cookie_brsy_pc_account');
		var uid = getCookie('cookie_brsy_pc_uid');
		var transmoney = $("#transmoney").val();
//		验证转账金额
		ajaxWebPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				var resdata = data.resobj;
				var money = resdata.money;
				if(transmoney < 0 || transmoney == "") {
					$.jBox.tip("输入的金额不能为空或负数", "error");
				} else if(transmoney > money) {
					$.jBox.tip("输入的金额不能大于账户余额", "error");
				}
			}
		}, 'json')
//		调用checkpic接口
		ajaxWebPostAsyncData(checkpicIdentifyingcode, {
			"account": account,
		}, false, function(data) {
			var obj = data.resobj;
			console.log(obj);
			$('#objval').val(obj);
			if(obj == 1) {
				selectCodeCheck()
				$('.check').show();
			}

		}, 'json')

	})

})

function transreserve() {
	var uid = getCookie('cookie_brsy_pc_uid');
	var targetAccount = $("#targetAccount").val();	
	var targetName = $("#targetName").val();
	
	var transmoney = $("#transmoney").val();
	var checkcode = $('#checkcode').val();
	ajaxWebPostAsyncData(transferAccount, {
		"account": targetAccount,
		"uid": uid,
		"money": transmoney,
		"codeSms": checkcode,
		"username": targetName
	}, false, function(data) {
		alert(data.code);
		if(data.code == "40000") {
			$.jBox.tip("转账成功", "success");
		} else {

			$.jBox.tip(data.info, "error");

		}
	}, 'json')

}
//获取图片验证码
function selectCodeCheck() {
	var time = new Date().getMilliseconds();
	$('#imgCheckCode').attr('src', https_domain+'/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */
function getCheckcode() {
	var targetAccount = $("#targetAccount").val();
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(targetAccount)) {
		$.jBox.tip("对方手机号格式不正确", "error");
		return false;
	} else if(targetAccount.length != 11) {
		$.jBox.tip('账号必须是正确的手机号', 'error');
		return false;
	}

	var targetName = $("#targetName").val();
	if(targetName == "") {
		$.jBox.tip("用户名不能为空!", "error");
		return false;
	}
	
	var transmoney = $("#transmoney").val();
	if (transmoney == ""){
		$.jBox.tip('转账金额不能为空', 'error');
		return false;
	}

	var account = $("#phone").val();
	var obj = $('#objval').val();

	if(obj == 0) {

		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "6",
			"code": "",
			"codeKey": ""
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {

				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	} else if(obj == 1) {
	
		var java_checkCode = getCookie('cookie_brsy_pic_code');
		var checkCode = $('#c_checkCode').val();

		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "6",
			"code": checkCode,
			"codeKey": java_checkCode
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {
				selectCodeCheck();
				$.jBox.tip(data.info, "error");
			}

		}, 'json')
	}

}