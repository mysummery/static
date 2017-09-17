



	var api="http://dev.liqiang365.com"; //测试
	//var api : "http://www.liqiang365.com"; //正式
    var slide = "https://dev-api.liqiang365.com/video/get/slide"; //轮播图片
	var selectFenlei="https://dev-api.liqiang365.com/videocourse/list/group"; //查询八大块

	var selectFenleiTwo="https://dev-api.liqiang365.com/videocourse/list/group/two"; //查询课程集

	var selectFenleiThree="https://dev-api.liqiang365.com/videocourse/list"; //查询课程列表

	var selectFenleiFour="https://dev-api.liqiang365.com/video/list"; //查询视频列表
	
	var selectshipinplay="https://dev-api.liqiang365.com/video/detail";   //查询视频播放详情
	
	var slectInfoByUid="https://dev-api.liqiang365.com/user/get";    //个人信息
	
	var reservePersonalInfo="https://dev-api.liqiang365.com/update"; //保存个人信息
	
	var registe ="https://dev-api.liqiang365.com/register/reg"; //注册
	
	var loginAjax="https://dev-api.liqiang365.com/login/in" ;//登录
	
	var sendCodeCheck= "https://dev-api.liqiang365.com/sms/send";  //发送验证码
	 
	var checkIdentifyingcode= "https://dev-api.liqiang365.com/sms/check"; //验证短信验证码是否正确

	/**
	 * 获取URL参数
	 */
	function getQueryString (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null)
			return unescape(r[2]);
		return null;
	}

	 function getRequest() {
		var url = window.location.search; //获取url中"?"符后的字串   
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	/**
	 * Cookie 操作
	 */
	 function getCookie (name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}

	function setCookie (name, value) {
		var exp = new Date();
		exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期  
		document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
		return true;

	}
//清理cookie
function clearCookie() {

	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + "=;expires=" + (new Date(0)).toUTCString() + ";path=/";
	}
	var code = getQueryString("code");
	window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
}

function clearCookie_new() {

	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + "=;expires=" + (new Date(0)).toUTCString() + ";path=/";
	}
}

	/*
 * ajax封装 
 */

function ajaxPostAsyncData (url, data, async, successfn, complate) {
	data = (data == null || data == "" || typeof(data) == "undefined") ? {
		"date": new Date().getTime()
	} : data;
	data['updateVersion'] = "notUpdate";
	if(getCookie('isLogin') == "2") {
		if(getCookie('cookie_brsy_h5_token') == null) {
			clearCookie();
		} else {
			data['token'] = getCookie('cookie_brsy_h5_token');

		}
	}
	var ajaxTimeoutTest = $.ajax({
		type: "post",
		data: data,
		timeout: 5000,
		async: async,
		url: url,
		dataType: "json",
		beforeSend: function(XMLHttpRequest) {},
		success: function(d) {
			//if(d.code == "40002") {
			//	return;
			//}
			//successfn(d);
			if(d.code == "40000") {
				successfn(d);
			} else if(d.code == "40003") { //token有误
				var code = getQueryString("code");
				$.jBox.tip("数据有误，请重新登录！!", "error");
				setTimeout(function(){
					window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
				},2000)
			} else if(d.code == "40008" && getCookie('cookie_brsy_pic_token') == null) { //参数有误 
				var code = getQueryString("code");
				$.jBox.tip("参数有误，请重新登录！!", "error");
				setTimeout(function(){
					window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
				},2000)
				
				
			} else {
				//				$.jBox.tip("失败!" + d.info, "error");
				successfn(d);
				return;
			}
		},
		complete :function  (XMLHttpRequest, textStatus) {
//			if(complate) {
//				complate(XMLHttpRequest, textStatus);
//			};
			
			if(textStatus == 'timeout' || textStatus == 'error') { //超时,status还有success,error等值的情况
				complate(XMLHttpRequest);
			}
		},
		error: function(e) {}
	});
}
