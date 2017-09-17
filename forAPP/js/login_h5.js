
/**
 * 初始化页面
 */
function login_h5() {
	var account = $("#account").val();
	var password = $("#password").val();
	var xuliehaoType = getQueryString('xuliehaoType');
	if(account == "" || password == "") {
		//alert("用户名和密码不能为空!");
		$.jBox.tip("用户名和密码不能为空!", "error");
		return false;
	}

	var regu = /^1[3|4|5|6|8][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}

	ajaxPostAsyncData(loginAjax, {
		"account": account,
		"password": password,
	}, false, function(data) {
		if(data.code == "40000") { //判断是否是会员，若不是跳转到支付
			var uid = data.resobj.uid;
			var mycode = data.resobj.mycode;
			var beicode = getQueryString('beicode');
			setCookie('cookie_brsy_h5_token', data.resobj.token, 7);
 
			setCookie('isLogin', '2', 7);

			setCookie('cookie_brsy_h5_token', data.resobj.token, 7);
			ajaxPostAsyncData(slectInfoByUid, {
				"uid": uid
			}, false, function(data) {
				if(data.code == "40000") {
					var obj = data.resobj.huiyuan;
					if(obj == "2") {
						//alert("您已是李强365会员!");
						$.jBox.tip("您已是李强365会员!", "error");
						return false;
					} else {

						var mycode = '';
						//根据uid查询用户mycode
						ajaxPostAsyncData(slectInfoByUid, {
							"uid": uid
						}, false, function(data) {
							if(data.code == "40000") {
								mycode = data.resobj.mycode;
								window.location.href = "/static/forAPP/pay/tiaozhuan.html?mycode=" + mycode + "&uid=" + uid + "&beicode=" + beicode + "&xuliehaoType=" + xuliehaoType;
							}
						}, 'json')

					}

				}
			}, 'json')
		} else {
			$.jBox.tip("登录失败!" + data.info, "error");
		}
	}, 'json')

}
