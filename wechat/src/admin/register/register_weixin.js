/* added by 张明月 at 2017.08.22 for 判断是否商城注册 begin */
var from = getQueryString("from"); //跳转类型

var registers; //注册接口
var shopurl = sessionStorage.shopurl; //获取跳转链接

if(shopurl != null && shopurl != '' && shopurl != undefined && shopurl.indexOf('&') != -1) {
	shopurl = shopurl.substr(0, shopurl.indexOf('&')); //截掉from
}

//商城注册隐藏邀请码、接口更换
if(shopurl != '' && shopurl != undefined) {
	$('#beicode').hide();
	registers = register_shop; //商城注册接口
} else {
	registers = register; //普通注册接口
}
/* added by 张明月 at 2017.08.22 for 判断是否商城注册 end */
function download() {
	window.location.href = "/static/wechat/src/admin/download.html";
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

}

function saveForm() {
	if(!$('#checkbox-1').prop('checked')) {
		$.jBox.tip('请先同意协议', '');
		return;
	}
	var code = getQueryString("code");
	var beicode = $("#beicode").val();
	var account = $("#account").val();
	var password = $("#password").val();
	var name = $("#name").val();
	var checkcode = $("#checkcode").val();

	//	//清空页面数据
	//	$("#account").val('');
	//	$("#password").val('');
	//	$("#checkcode").val('');

	if(account == "" || password == "" || name == "") {
		$.jBox.tip("请完善信息", "error");
		selectCodeCheck();
		$('#password').val('');
		$('#checkcode').val('');
		$('#c_checkCode').val('');
		return;
	}

	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account) || account.length != 11) {
		$.jBox.tip("手机号格式不正确", "error");
		selectCodeCheck();
		$('#password').val('');
		$('#checkcode').val('');
		$('#c_checkCode').val('');
		return;
	}
	if(password.length < 6 || password.length > 20) {
		$.jBox.tip("密码是6~20位数字和字母组合!", "error");
		selectCodeCheck();
		$('#password').val('');
		$('#checkcode').val('');
		$('#c_checkCode').val('');
		return;
	}

	//var obj = $('#obj').val();
	if($('.hidecode').css('display') != 'none') {
		var piccode = $('#c_checkCode').val();
		var codeKey = getCookie('cookie_brsy_pic_code');
	} else {
		var piccode = '';
		var codeKey = '';
	}
	ajaxPostAsyncData(registers, {
		"parentcode": beicode,
		"account": account,
		"username": name,
		"password": password,
		"codesms": checkcode,
		"piccode": piccode,
		"codeKey": codeKey,
		"share_tag": 3
	}, false, function(data) {
		if(data.code == "40000") {
			//隐式登陆
			ajaxPostAsyncData(loginAjax, {
				"account": account,
				"password": password,
				"share_tag": 3,
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
					/* added by 张明月 at 2017.08.22 for 判断是否商城注册 begin */
					setTimeout(function() {
						if(shopurl != '' && shopurl != undefined) {
							setCookie('fromAppShop', 'fromAppShop', 7);
							window.location.href = shopurl;
							/* added by 张明月 at 2017.08.22 for 判断是否商城注册 end */
						} else {
							setCookie('fromAppShop', '', 7);
							var rurl = encodeURIComponent(api + "/static/wechat/src/service/tiaozhuan/tiaozhuan_gongzhong.html?shareTag=1&token=" + token + "&mycode=" + mycode + "&uid=" + uid + "&xuliehaoType=1");
							window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
								appid +
								"&redirect_uri=" +
								rurl +
								"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
						}
					}, 1000);
					//获取用户openid 
					//$('.hide').show(); //打开遮盖
					//$('.choose').show();
					//$('.rePay').live('click',function(){

					//})
				}
			}, 'json')

		} else {
			selectCodeCheck();
			$('#password').val('');
			$('#checkcode').val('');
			$('#c_checkCode').val('');
			$.jBox.tip("注册失败!" + data.info, "error");
			$("#password").val('');
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

	var account = $("#account").val();
	var obj = $('#obj').val();
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account) || account.length != 11) {
		$.jBox.tip("手机号格式不正确", "error");
		selectCodeCheck();
		return;
	}
	var testcheck = https_domain + "/sms/checkpic";
	ajaxPostAsyncData(testcheck, {
			"account": account,
			"share_tag": 3
		}, false, function(data) {

			if(data.code == "40000") {
				var obj = data.resobj;
				$('#obj').val(obj);
				if(obj == 1) {
					//selectCodeCheck();
					$('.hidecode').show();
				}
			}
		}, 'json')
		//alert(obj);
		//alert(account);
	if(obj == 1) {
		var java_checkCode = getCookie('cookie_brsy_pic_code');
		var checkCode = $('#c_checkCode').val();
		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		if($('#c_checkCode').val().length != 4) {
			//alert($('#c_checkCode').val().length);
			$.jBox.tip("图片验证码是4位！", "error");
			selectCodeCheck();

			$('#c_checkCode').val('');
			return;
		}
		var sendCodeCheck = https_domain + "/sms/send_h5";
		ajaxPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "1",
			"code": checkCode,
			"codeKey": java_checkCode,
			"share_tag": 3
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");

			} else {
				selectCodeCheck();
				$('#password').val('');
				$('#checkcode').val('');
				$('#c_checkCode').val('');
				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	} else {
		var sendCodeCheck = https_domain + "/sms/send_h5";
		//alert(sendCodeCheck);
		ajaxPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "1",
			"code": '',
			"codeKey": '',
			"share_tag": 3
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {
				selectCodeCheck();
				$('#password').val('');
				$('#checkcode').val('');
				$('#c_checkCode').val('');

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
		"uid": uid,
		"share_tag": 3
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
	var rurl = encodeURIComponent(api + "/static/wechat/src/admin/login/upgrade_login.html?shareTag=1");
	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
		appid +
		"&redirect_uri=" +
		rurl +
		"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	//window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;

}
selectCodeCheck();