function download(){
	window.location.href="/static/wechat/src/admin/download.html";
}
function initEdit() {
	var uid = getQueryString('uid');
	var action = https_domain + "/user/get/h5?uid=" + uid;
	ajaxPostAsyncData(action, null, false, function(data) {
		if(data.code == 40000) {
			$("#beicode").html(data.resobj.usercode);
			$("#yaoqingren").html(data.resobj.username);
		} else {
			$.jBox.tip("页面初始化失败!", "error");
		}
	}, 'json')
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
/**
 * 保存表单
 * 
 * @return
 */
function saveForm() {

	var parentcode = $("#beicode").html();
	var account = $("#account").val();
	var password = $("#password").val();
	var checkcode = $("#checkcode").val();
	var name = $("#name").val();

/*	//清空页面数据
	$("#name").val('');
	$("#account").val('');
	$("#password").val('');
	$("#checkcode").val('');*/
	if($('.hidecode').css('display')!='none') {
		var piccode = $('#checkCodeImg').val();
		var codeKey = getCookie('cookie_brsy_pic_code');
	} else {
		var piccode = '';
		var codeKey = '';
	}
	if(parentcode == "" || account == "" || password == "") {
		$.jBox.tip("请完善信息", "error");
		return;
	}
	if(!$('#check1').prop('checked')) {
		$.jBox.tip('请先同意协议', '');
		return;
	}
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	ajaxPostAsyncData(register, {
		"parentcode": parentcode,
		"account": account,
		"username": name,
		"password": password,
		"codesms": checkcode,
		"piccode": piccode,
		"codeKey": codeKey,
		"share_tag": 1
	}, true, function(data) {
		if (data.code == "40000") {
			ajaxPostAsyncData(loginAjax, {
				"account": account,
				"password": password,
				"oneType" : "1",
				"share_tag": 1 // 0 是非单点登录 ， 1是单点登录
			}, false, function(data) {
				if(data.code == "40000") { //登录login 
					var token = data.resobj.token;
					var uid = data.resobj.id;
					var usercode = data.resobj.usercode;
					$.jBox.tip("注册成功!", "success");
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
					//$('.hide').show(); //打开遮盖
					//$('.choose').show();
					//获取用户openid 
					//$('.rePay').live('click',function(){
					// 跳转到支付页面
					window.location.href = "/static/wechat/src/service/tiaozhuan/tiaozhuan_gongzhong.html?shareTag=1&token=" + token + "&mycode=" + usercode + "&uid=" + uid + "&xuliehaoType=1";
				//})
					}
			}, 'json')
		} else {
			selectCodeCheck();
			$("#password").val('');
			$("#checkCodeImg").val('');
			$('#checkcode').val('');
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

//      var java_checkCode = getCookie('cookie_brsy_pic_code');
//      var checkCodeImg = $('#checkCodeImg').val();
//      if(checkCodeImg == null || checkCodeImg == "") {
//              $.jBox.tip("图片验证码不能为空", "error");
//              return;
//      }
		var obj = $('#obj').val();
        var account = $("#account").val();
        var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
        var re = new RegExp(regu);
        if(!re.test(account)) {
                $.jBox.tip("手机号格式不正确", "error");
                return;
        }
		var testcheck = https_domain + "/sms/checkpic";
		ajaxPostAsyncData(testcheck, {
			"account": account,
			"share_tag": 1
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
		if(obj == 1) {
		var java_checkCode = getCookie('cookie_brsy_pic_code');
		var checkCode = $('#checkCodeImg').val();
		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		var sendCodeCheck = https_domain + "/sms/send_h5";
		ajaxPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "1",
			"code": checkCode,
			"codeKey": java_checkCode,
			"share_tag": 1
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {
				selectCodeCheck();
				$("#password").val('');
				$("#checkCodeImg").val('');
				$('#checkcode').val('');
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
			"share_tag": 1
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {
				selectCodeCheck();
				$("#password").val('');
				$("#checkCodeImg").val('');
				$('#checkcode').val('');
				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	}
}


/*8.17 登录跳转*/
function gologin() {
	var parentcode = $("#beicode").html();
	var rurl = encodeURIComponent( api + "/static/forAPP/pay/share_login.html?mycode=" + parentcode + "&xuliehaoType=1");
			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
				appid +
				"&redirect_uri=" +
				rurl +
				"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
}
/*10.17下载app*/
function down() {
	window.location.href = "/static/wechat/src/admin/download.html";
}
initEdit();
selectCodeCheck();