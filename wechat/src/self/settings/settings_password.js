function updatepasswd() {
	var account = getCookie('cookie_brsy_h5_account');
	var oldpassword = $("#oldpassword").val();
	var newpassword = $("#newpassword").val();
	var uid = getCookie('cookie_brsy_h5_uid');
	if(oldpassword.length < 6 || oldpassword.length > 20) {
		$.jBox.tip("请输入6~20位数字和字母组合!", "error");
	} else if(newpassword.length < 6 || newpassword.length > 20 || newpassword.indexOf(" ") != -1) {
		$.jBox.tip("请输入6~20位数字和字母组合!", "error");
	} else {
		ajaxPostAsyncData(updPassword, {
			"uid": uid,
			"account": account,
			"oldpassword": oldpassword,
			"newpassword": newpassword
		}, false, function(data) {
			if(data.code == "40000") {
				$.jBox.tip("密码修改成功!", "success");
				window.setTimeout(function() {
//					var code = getQueryString("code");
					clearCookie_new();
					window.location.href = "/static/wechat/src/admin/login/upgrade_login.html";
				}, 1000);
			} else if(data.code == "40014") {
				$.jBox.tip("当前密码错误!", "error");
			} else {
				$.jBox.tip(data.info, "error");
			}
		}, 'json');
	}
}