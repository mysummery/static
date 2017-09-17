/**
 * 保存表单
 *
 * @return
 */
clearCookie_new();
function initedit() {
	var obj = getRequest();
	$("#beicode b").html(obj.mycode);
	$("#person b").html(obj.name);

}

function saveForm() {
	if(!$('#checkbox-1').prop('checked')) {
		$.jBox.tip('请先同意协议', '');
		return;
	}
	var code = getQueryString("code");
	var beicode = $("#beicode b").html();
	var account = $("#account").val();
	var password = $("#password").val();
	var name = $("#name").val();
	var checkcode = $("#checkcode").val();

	//	//清空页面数据
	//	$("#account").val('');
	//	$("#password").val('');
	//	$("#checkcode").val('');

	if(beicode == "" || account == "" || password == "" || name == "") {
		$.jBox.tip("请完善信息", "error");
		selectCodeCheck();
		return;
	}
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		selectCodeCheck();
		return;
	}
	if(password.length < 6 || password.length > 20) {
		$.jBox.tip("密码是6~20位数字或者字母!", "error");
		selectCodeCheck();
		return;
	}
	var obj = $('#obj').val();
	if(obj == 1) {
		var piccode = $('#c_checkCode').val();
		var codeKey = getCookie('cookie_brsy_pic_code');
	} else {
		var piccode = '';
		var codeKey = '';
	}
	console.log(piccode);
	console.log(codeKey);
	var test_register="http://10.1.1.210:8080/register/reg.ph";
	ajaxPostAsyncData(test_register, {
		"parentcode": beicode,
		"account": account,
		"username": name,
		"password": password,
		"codesms": checkcode,
		"piccode": piccode,
		"codeKey": codeKey
	}, false, function(data) {
		if(data.code == "40000") {
			//隐式登陆
			ajaxPostAsyncData(loginAjax, {
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
					setCookie('cookie_brsy_h5_uid', uid, 7);
					setCookie('cookie_brsy_h5_mycode', mycode, 7);
					setCookie('cookie_brsy_h5_account', account, 7);
					setCookie('cookie_brsy_h5_name', encodeURIComponent(name), 7);
					setCookie('cookie_brsy_h5_imgurl', imgurl, 7);
					setCookie('cookie_brsy_h5_jztime', jztime, 7);
					setCookie('cookie_brsy_h5_huiyuan', huiyuan, 7);
					setCookie('cookie_brsy_h5_tuangoujibie', tuangoujibie, 7);
					setCookie('cookie_brsy_h5_shenfenstatus', shenfenstatus, 7);
					setCookie('cookie_brsy_h5_usertype', usertype, 7);

					setCookie('cookie_brsy_h5_token', token, 7);
					setCookie('isLogin', '2', 7);
					$.jBox.tip("注册成功!", "success");
					//获取用户openid 

					var rurl = encodeURIComponent(api + "/static/wechat/src/service/tiaozhuan/tiaozhuan_gongzhong.html?shareTag=1&token=" + token + "&mycode=" + mycode + "&uid=" + uid + "&xuliehaoType=1");
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						appid +
						"&redirect_uri=" +
						rurl +
						"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
				}
			}, 'json')

		} else {
			selectCodeCheck();
			$.jBox.tip("注册失败!" + data.info, "error");
		}
	}, 'json')

}

function selectCodeCheck() {
	var time = new Date().getMilliseconds();
	//var https_domain="http://10.1.1.210:8080";
	$('#imgCheckCode').attr('src', "http://10.1.1.210:8080" + '/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */
function getCheckcode() {
	var account = $("#account").val();
	var obj = $('#obj').val();
	alert(obj);
	alert(account);
	if(obj == 1) {
		var java_checkCode = getCookie('cookie_brsy_pic_code');
		var checkCode = $('#c_checkCode').val();
		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		var sendCodeCheck="http://10.1.1.210:8080/sms/send";
		ajaxPostAsyncData(sendCodeCheck, {
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
	} else {
		var sendCodeCheck="http://10.1.1.210:8080/sms/send";
		alert(sendCodeCheck);
		ajaxPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "1",
			"code": '',
			"codeKey": ''
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
/**
 * 跳转地址
 * @param obj
 * @return
 */
function gohref(uid, beicode) {
	//先判断是否是会员
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid
	}, false, function(data) {
		if(data.code == "40000") {
			var obj = data.resobj.huiyuan;
			if(obj == "1") {
				window.setTimeout(function() {
					window.location.href = "/static/login/shipin/tiaozhuan.html?mycode=" +
						beicode;
				}, 1000);
			} else if(obj == "2") {
				window.location.href = "/static/forAPP/share.html?mycode=" + beicode;
			}
		}
	}, 'json')

}

function gologin() {

	var code = getQueryString("code");

	window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
}

function picture_check() {
	var account = $("#account").val();
	//alert(account);
	//alert(account);
	var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	//var testcheck = "https://dev-api.liqiang365.com/sms/checkpic";
	var testcheck = "http://10.1.1.210:8080/sms/checkpic";
	ajaxPostAsyncData(testcheck, {
		"account": account
	}, false, function(data) {

		if(data.code == "40000") {
			var obj = data.resobj;
			$('#obj').val(obj);
			if(obj == 1) {
				
				$('#picture_check').html("<img id=\"imgCheckCode\" onclick=\"selectCodeCheck();\" src=\"http://10.1.1.210:8080/validcode/get\" style=\"width:33%;float: right;margin-top: 0px;height: 3.5rem;\">");
				$('.hidecode').show();
			}
		}
	}, 'json')
}
initedit();