/**
 * 初始化页面
 */
var data = getRequest();
var type = data.type;

function login() {

	var account = $("#account").val();
	var password = $("#password").val();
	if(account == "" || password == "") {
		$.jBox.tip("手机号和密码不能为空!", "error");
		return false;
	}

	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return false;
	} else if(account.length != 11) {
		$.jBox.tip('账号必须是正确的手机号', 'error');
		return false;
	}

	setCookie('isLogin', '1', 7);
	ajaxWebPostAsyncData(loginAjax, {
		"account": account,
		"password": password,
		"oneType": "0" // 0 是非单点登录 ， 1是单点登录
	}, false, function(data) {
		if(data.code == "40000") {
			var uid = data.resobj.id;
			var mycode = data.resobj.usercode;
			var account = data.resobj.account;
			var name = data.resobj.username;
			var imgurl = data.resobj.headimgurl;
			var jztime = data.resobj.vipendtime;
			var huiyuan = data.resobj.vipstate;
			var tuangoujibie = data.resobj.groupbuylevel;
			var shenfenstatus = data.resobj.authstate;
			var usertype = data.resobj.usertype;
			var parentcode = data.resobj.parentcode;
			var token = data.resobj.token;
			clearCookie_new();
			setCookie('cookie_brsy_pc_uid', uid, 7);
			setCookie('cookie_brsy_pc_mycode', mycode, 7);
			setCookie('cookie_brsy_pc_account', account, 7);
			setCookie('cookie_brsy_pc_name', encodeURI(name, "utf-8"), 7);
			setCookie('cookie_brsy_pc_imgurl', imgurl, 7);
			setCookie('cookie_brsy_pc_parentcode', parentcode, 7);
			setCookie('cookie_brsy_pc_jztime', jztime, 7);
			setCookie('cookie_brsy_pc_huiyuan', huiyuan, 7);
			setCookie('cookie_brsy_pc_tuangoujibie', tuangoujibie, 7);
			setCookie('cookie_brsy_pc_shenfenstatus', shenfenstatus, 7);
			setCookie('cookie_brsy_pc_usertype', usertype, 7);
			setCookie('cookie_brsy_pc_token', token, 7);
			setCookie('isLogin', '2', 7);
			ajaxWebPostAsyncData(slectInfoByUid, {
				"uid": uid,
				"type": "1"
			}, false, function(data) {
				if(data.code == "40000") {
					$.jBox.tip("登录成功!", "success");
					if(type == 1) {
						setTimeout(function() {
							history.go(-1);
						}, 2000)
					} else {
						setTimeout(function() {
							window.location.href = "/static/pc/src/index/index.html";
						}, 2000)
					}

				} else {
					alert('第二个接口返回失败' + data.code);
				}
			}, 'json')
		} else {
			$.jBox.tip("登录失败!" + data.info, "error");
		}
	}, 'json', function() {
		setCookie('isLogin', '2', 7);
	});

}

/*function goregister() {
	var code = getQueryString("code");
	window.location.href = "/static/login/shipin/new_register.html";
}*/

/*function forget_password() {
	var code = getQueryString("code");
	window.location.href = "/static/login/shipin/new_login.html";
}
*/
//返回首页
function backindex() {
	window.location.href = "/static/pc/src/index/index.html";
}

function keyLogin() {
	e = arguments.callee.caller.arguments[0] || window.event;
	if(e.keyCode == 13) {
		document.getElementById("rebtn").click(); //调用登录按钮的登录事件
	} //回车键的键值为13

}