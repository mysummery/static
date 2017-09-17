// JavaScript Document

/**
 * 保存表单
 *
 * @return
 */
function update() {
	var code = getQueryString("code");
	var account = $("#account").val();
	var password = $("#password").val();
	var checkcode = $("#checkcode").val();
//	//清空页面数据
//	$("#account").val('');
//	$("#password").val('');
//	$("#checkcode").val('');

	if(account == "" || password == "") {
		$.jBox.tip("请完善信息", "error");
		selectCodeCheck();
		return;
	}
	var regu = /^1[3|4|5|6|7|8][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		selectCodeCheck();
		return;
	}
	
	if(password.length < 6 || password.length > 20) {
		$.jBox.tip("密码是6~20位数字和字母的组合!", "error");
		selectCodeCheck();
		return;
	}
	ajaxPostAsyncData(updatepassword, {
		"account": account,
		"codesms": checkcode,
		"password": password,
		"piccode":$('#c_checkCode').val(),
		"codeKey":getCookie('cookie_brsy_pic_code')
	}, false, function(data) {
		//alert(data.code);
		if(data.code == "40000") {
			alert("密码修改成功!");
			var code = getQueryString("code");
			clearCookie_new();
			window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
		} else {
			selectCodeCheck();
			$.jBox.tip(data.info, "error");
		}
	}, 'json')

}

function selectCodeCheck() {
	var time = new Date().getMilliseconds();
	$('#imgCheckCode').attr('src', https_domain + '/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */
function getCheckcode() {
	var java_checkCode = getCookie('cookie_brsy_pic_code');
	var checkCode = $('#c_checkCode').val();
	if(checkCode == null || checkCode == "") {
		$.jBox.tip("图片验证码不能为空", "error");
		return;
	}
	var account = $("#account").val();
	var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	ajaxPostAsyncData(sendCodeCheck, {
		"account": account,
		"sendCodeType": "2",
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

/* modefied by 李思远 at 2017.09.04 for 修改首次操作会提示图片验证码无效 begin   */
selectCodeCheck();
/* modefied by 李思远 at 2017.09.04 for 修改首次操作会提示图片验证码无效 end   */


/**
 * 跳转地址
 * @param obj
 * @return
 */