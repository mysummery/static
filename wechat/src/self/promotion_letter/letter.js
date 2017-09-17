/**
 * 保存表单
 *
 * @return
 */
var share_tag;
var from = getQueryString("from");
if(from!=null&&from!=undefined&&from!=''){
	share_tag=4;//APP分享的
}else{
	share_tag=5;//微信里的
}
function download(){
	window.location.href="/static/wechat/src/self/promotion_letter/share_last.html";
}

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
		//$('#password').val('');
		$('#checkcode').val('');
		$('#c_checkCode').val('');
		return;
	}
	if(password.length < 6 || password.length > 20) {
		$.jBox.tip("密码是6~20位数字或者字母!", "error");
		selectCodeCheck();
		$('#password').val('');
		$('#checkcode').val('');
		$('#c_checkCode').val('');
		return;
	}
	//var obj = $('#obj').val();
	if($('.hidecode').css('display')!='none') {
		var piccode = $('#c_checkCode').val();
		var codeKey = getCookie('cookie_brsy_pic_code');
	} else {
		var piccode = '';
		var codeKey = '';
	}
	console.log(piccode);
	console.log(codeKey);
	//var test_register=https_domain+"/register/reg.ph";
	ajaxPostAsyncData(register, {
		"parentcode": beicode,
		"account": account,
		"username": name,
		"password": password,
		"codesms": checkcode,
		"piccode": piccode,
		"codeKey": codeKey,
		"share_tag": share_tag
	}, false, function(data) {
		if(data.code == "40000") {
			//隐式登陆
			ajaxPostAsyncData(loginAjax, {
				"account": account,
				"password": password,
				"oneType": "0" ,// 0 是非单点登录 ， 1是单点登录
				"share_tag": share_tag
			}, false, function(data) {
				if(data.code == "40000") {
					//存储cookie
					var uid = data.resobj.id;
					var mycode = data.resobj.usercode;
					var token = data.resobj.token;
					/*					var account = data.resobj.account;
										var name = data.resobj.username;
										var imgurl = data.resobj.headimgurl;
										var jztime = data.resobj.vipendtime;
										var huiyuan = data.resobj.vipstate;
										var tuangoujibie = data.resobj.groupbuylevel;
										var shenfenstatus = data.resobj.authstate;
										var usertype = data.resobj.usertype;
					
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
										setCookie('isLogin', '2', 7);*/

					//$.jBox.tip("注册成功!", "success");
					$('.hide').show(); //打开遮盖
					$('.choose').show();
					//获取用户openid 
					$('.rePay').live('click',function(){
						var rurl = encodeURIComponent(api + "/static/wechat/src/service/tiaozhuan/tiaozhuan_gongzhong.html?shareTag=1&token=" + token + "&mycode=" + mycode + "&uid=" + uid + "&xuliehaoType=1");
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						appid +
						"&redirect_uri=" +
						rurl +
						"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
					})
					
				} 
			}, 'json')

		}else {
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
	//var https_domain="http://10.1.1.210:8080";
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
	if(!re.test(account)||account.length!=11) {
		$.jBox.tip("手机号格式不正确", "error");
		selectCodeCheck();
		return;
	}
	//alert(obj);
	//alert(account);
	var testcheck = https_domain + "/sms/checkpic";
		ajaxPostAsyncData(testcheck, {
			"account": account,
			"share_tag": share_tag
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
		var checkCode = $('#c_checkCode').val();
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
			"share_tag": share_tag
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
			"share_tag": share_tag
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
		"share_tag": share_tag
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
	var rurl = encodeURIComponent(api + "/static/wechat/src/admin/login/upgrade_login.html?shareTag=1" );
					window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
						appid +
						"&redirect_uri=" +
						rurl +
						"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
	//window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
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
$(document).ready(function() {
		var action_jsapi_config = weixingz_jsapi + "?url=" + encodeURIComponent(location.href.split('#')[0]);
		$.getJSON(action_jsapi_config, null, function(json) {

			var ret = json.resobj;
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: appid, // 必填，公众号的唯一标识
				timestamp: ret.timestamp, // 必填，生成签名的时间戳
				nonceStr: ret.nonceStr, // 必填，生成签名的随机串
				signature: ret.signature, // 必填，签名，见附录1
				jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		});
	
	});

    // 分享给朋友
    
	
wx.ready(function() {
	var href=window.location.href;
wx.onMenuShareAppMessage({
	    title: '致用户的一封信', // 分享标题
	    desc: '李强365汇聚全球智慧，与您分享成功的快乐！达人分享，全球共享', // 分享描述
	    link: href, // 分享链接
	    imgUrl: 'http://dev.liqiang365.com/static/wechat/assets/images/share_logo.png', // 分享图标
      	dataUrl: '',
      	success: function () { 
		// 用户确认分享后执行的回调函数 
		$.jBox.tip("分享成功.",'success'); 
		}, 
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });	
    wx.onMenuShareTimeline({
    title: '致用户的一封信', // 分享标题
    link: href, // 分享链接
    desc: '李强365汇聚全球智慧，与您分享成功的快乐！达人分享，全球共享', // 分享描述
    imgUrl: 'http://dev.liqiang365.com/static/wechat/assets/images/share_logo.png', // 分享图标
    success: function () { 
    	$.jBox.tip("分享成功.",'success'); 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
});
})
initedit();
selectCodeCheck();
