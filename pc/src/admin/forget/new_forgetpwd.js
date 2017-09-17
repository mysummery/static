/**
 * 保存表单
 *
 * @return
 */

function forgetpwd() {
	//手机验证码
	var account = $("#account").val();
	var checkcode = $('#checkcode').val();//手机验证码的值
	var password = $("#password").val();
	if(checkcode == "" || account == "" || password == "") {
		$.jBox.tip("请完善信息", "error");
		selectCodeCheck();
		return false;
	}
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

	var checkCode = $('#c_checkCode').val();//图片验证码的值
	
	var java_checkCode = getCookie('cookie_brsy_pic_code');

	if(checkCode == null || checkCode == "") {
		$.jBox.tip("图片验证码不能为空", "error");
		return;
	}
	var regu = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	var re = new RegExp(regu);
	if(!re.test(password)) {
		$.jBox.tip('密码为6~20位,字母和数字组合', 'error');
		return false;
	}
	var password1 = $("#password1").val();
	if(password != password1) {
		$.jBox.tip('两次输入不一致', 'error');
		return false;
	}

	ajaxWebPostAsyncData(updatepassword, {
		"account": account,
		"password": password,
		"codesms": checkcode,
		"piccode": checkCode,//图片验证码
		"codeKey": java_checkCode
	}, false, function(data) {
		if(data.code == "40000") {
			$.jBox.tip('密码修改成功', 'success');
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

					setTimeout(function() {
						window.location.href = "/static/pc/src/index/index.html";
					}, 1000);

				}
			}, 'json')

		} else {
			$('#checkcode').val("");
			$('#c_checkCode').val("");
			selectCodeCheck();
			$.jBox.tip(data.info, "error");
		}
	}, 'json')

}
//获取图片验证码
function selectCodeCheck() {
	var time = new Date().getMilliseconds();
	$('#imgCheckCode').attr('src', https_domain + '/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */
function getCheckcode() {
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
	
	var java_checkCode = getCookie('cookie_brsy_pic_code');
	var checkCode = $('#c_checkCode').val();//图片验证码的值

	if(checkCode == null || checkCode == "") {
		$.jBox.tip("图片验证码不能为空", "error");
		return;
	}
	ajaxWebPostAsyncData(sendCodeCheck, {
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
			$('#checkcode').val("");
			$('#c_checkCode').val("");
			$.jBox.tip(data.info, "error");
		}

	}, 'json')
}



selectCodeCheck();