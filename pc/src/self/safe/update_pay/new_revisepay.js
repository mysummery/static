$(function() {
	$(".reserve").click (function () {
	var uid = getCookie('cookie_brsy_pc_uid');
	var account = getCookie('cookie_brsy_pc_account');
	var oldpassword = $("#oldPay").val();
	var newpassword = $("#newPay").val();
	 var regu = new RegExp("^[0-9]*$");
	 	var re = new RegExp(regu);
	if(!re.test(newpassword)) {
		$.jBox.tip('密码为6位数字', 'error');
		return false;
	}else if (newpassword.length < 6){
		$.jBox.tip('密码为6位数字', 'error');
		return false;
	}else {
			ajaxWebPostAsyncData(revisePay, {
				"uid": uid,
				"account": account,
				"oldpassword": oldpassword,
				"newpassword": newpassword
			}, false, function(data) {
				if(data.code == "40000") {
					$.jBox.tip("密码修改成功!", "success");
					$("#oldPay").val("");
					$("#newPay").val("");
				} else if(data.code == "40014") {
					$.jBox.tip("当前密码错误!", "error");
				} else {
					$.jBox.tip(data.info, "error");
				}
			}, 'json');
		}
	})



})