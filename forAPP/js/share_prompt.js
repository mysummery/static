$(function() {
	var now = new Date();
	var year = now.getFullYear() + 2;
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var day = now.getDay();
	$('.deadline').html(year + '年' + month + '月' + date + '日到期');

})

$('.download').click(function() {
	var newpassword = $(".password").val();
	var newpassword_confirm = $(".password_confirm").val();
	if(newpassword != newpassword_confirm) {
		$.jBox.tip("两次输入密码不一致!", "error");
	} else {
		var account = getCookie('cookie_brsy_h5_account');
		var oldpassword = account.substr(5, 12);
		var uid = getCookie('cookie_brsy_h5_uid');
		var token = getCookie('cookie_brsy_h5_token');
		if(newpassword.length < 6 || newpassword.length > 20 || newpassword.indexOf(" ") != -1) {
			$.jBox.tip("请输入6~20位数字或者字母!", "error");
		} else {
			ajaxPostAsyncData(updPassword, {
				"uid": uid,
				"account": account,
				"password": oldpassword,
				"token": token,
				"newPwd": newpassword
			}, false, function(data) {
				if(data.code == "40000") {
					$.jBox.tip("密码设置成功!", "success");
					window.setTimeout(function() {
						//var code = getQueryString("code");
						window.location.href = "share_last.html?code=" + code;
					}, 1000);

				} else {
					$.jBox.tip("密码设置失败!", "error");
				}
			}, 'json');
		}
	}
})