$(function() {
	$(".btn").click (function () {
	var uid = getCookie('cookie_brsy_pc_uid');
	var account = getCookie('cookie_brsy_pc_account');
	var oldpassword = $("#oldpassword").val();
	var newpassword = $("#newpassword").val();
	var regu = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	var re = new RegExp(regu);
	if(!re.test(oldpassword)) {
		$.jBox.tip('密码为6~20位,字母和数字组合', 'error');
		return false;
	}else if(!re.test(newpassword)) {
		$.jBox.tip('密码为6~20位,字母和数字组合', 'error');
		return false;
	}else if(oldpassword.length < 6 || oldpassword.length > 20) {
		$.jBox.tip('密码为6~20位,字母和数字组合', "error");
		return false;
	} else if(newpassword.length < 6 || newpassword.length > 20) {
		$.jBox.tip('密码为6~20位,字母和数字组合', "error");
		return false;
		} else {
			ajaxWebPostAsyncData(updPassword, {
				"uid": uid,
				"account": account,
				"oldpassword": oldpassword,
				"newpassword": newpassword
			}, false, function(data) {
				alert(data.code);
				if(data.code == "40000") {
					$.jBox.tip("密码修改成功!", "success");
					window.setTimeout(function() {
						clearCookie_new();
						window.location.href = "new_login.html";
					}, 1000);
				} else if(data.code == "40014") {
					$.jBox.tip("当前密码错误!", "error");
				} else {
					$.jBox.tip(data.info, "error");
				}
			}, 'json');
		}
	})



})