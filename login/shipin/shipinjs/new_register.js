/**
 * 保存表单
 *
 * @return
 */

function registe() {
	if(!$('#checkbox-1').prop('checked')) {
		$.jBox.tip('请先同意协议', '');
		return;
	}

	var beicode = $("#beicode").val();
	
	var name = $("#name").val();
   
	if(name == "") {
		//alert("用户名和密码不能为空!");
		$.jBox.tip("用户名不能为空!", "error");
		return false;
	}
	//手机验证码
	var account = $("#account").val();
	var checkcode = $('#checkcode').val();
	
	var password = $("#password").val();

	var regu = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	var re = new RegExp(regu);
	if(!re.test(password)) {
		$.jBox.tip('密码为6~20位,字母和数字组合', 'error');
		return false;
	}
	
	var obj = $('#obj').val();
	if(obj == 1) {
		var piccode = $('#c_checkCode').val();
		var codeKey = getCookie('cookie_brsy_pic_code');
	} else {
		var piccode = '';
		var codeKey = '';
	}
		
		

	ajaxWebPostAsyncData(register, {
		"username": name,
		"account": account,
		"password": password,
		"parentcode": beicode,
		"codesms": checkcode,
		"piccode": piccode,
		"codeKey": codeKey
	}, false, function(data) {
		if(data.code == "40000") {
			$.jBox.tip('注册成功', 'success');
			//隐式登陆
			ajaxWebPostAsyncData(loginAjax, {
				"account": account,
				"password": password,
				"oneType": "0" // 0 是非单点登录 ， 1是单点登录
			}, false, function(data) {

				if(data.code == "40000") {
					//存储cookie
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
					var token = data.resobj.token;
					clearCookie_new();
					setCookie('cookie_brsy_pc_uid', uid, 7);
					setCookie('cookie_brsy_pc_mycode', mycode, 7);
					setCookie('cookie_brsy_pc_account', account, 7);
					setCookie('cookie_brsy_pc_name', encodeURI(name, "utf-8"), 7);
					setCookie('cookie_brsy_pc_imgurl', imgurl, 7);
					setCookie('cookie_brsy_pc_jztime', jztime, 7);
					setCookie('cookie_brsy_pc_huiyuan', huiyuan, 7);
					setCookie('cookie_brsy_pc_tuangoujibie', tuangoujibie, 7);
					setCookie('cookie_brsy_pc_shenfenstatus', shenfenstatus, 7);
					setCookie('cookie_brsy_pc_usertype', usertype, 7);

					setCookie('cookie_brsy_pc_token', token, 7);
					setCookie('isLogin', '2', 7);

					backindex();

				}
			}, 'json')

		} else {
			$.jBox.tip("注册失败!" + data.info, "error");
		}
	}, 'json')

}
//获取图片验证码
function selectCodeCheck() {
	var time = new Date().getMilliseconds();
	$('#imgCheckCode').attr('src', 'https://dev-api.liqiang365.com/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */
function getCheckcode() {

	//	获取图片验证码

	var obj = $('#obj').val();
  
	var account = $("#account").val();
	if(obj == 0) {
		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "1",
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
			"sendCodeType": "1",
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

function picture_check() {
	var account = $("#account").val();
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return false;
	} else if(account.length != 11) {
		$.jBox.tip('账号必须是正确的手机号', 'error');
		return false;
	}
	ajaxWebPostAsyncData(checkpicIdentifyingcode, {
		"account": account,
	}, false, function(data) {
		var obj = data.resobj;
		$('#obj').val(obj);
		console.log(obj);
		if(obj == 1) {
			selectCodeCheck();
			$('.hidecode').show();
		}

	}, 'json')

}

//返回首页
function backindex() {
	window.location.href = "/static/login/shipin/index.html";
}

function keyLogin() {
	e = arguments.callee.caller.arguments[0] || window.event;
	if(e.keyCode == 13) {
		document.getElementById("rebtn").click(); //调用登录按钮的登录事件
	} //回车键的键值为13
}