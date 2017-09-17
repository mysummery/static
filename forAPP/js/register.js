 

function initEdit() {
	var obj = getRequest();
	$("#beicode").html(obj.mycode);
	$("#yaoqingren").html(obj.name);
	$('.goXy').attr('href','registerxy.html?mycode='+obj.mycode+"&name="+obj.name+"&type=1&xuliehaoType="+obj.xuliehaoType);
	//

}

/**
 * 保存表单
 * 
 * @return
 */
function saveForm() {

	var beicode = $("#beicode").html();
	var account = $("#account").val();
	var password = $("#password").val();
	var checkcode = $("#checkcode").val();
	var name = $("#name").val();
	//清空页面数据
//	$("#name").val('');
//	$("#account").val('');
//	$("#password").val('');
//	$("#checkcode").val('');

	if(beicode == "" || account == "" || password == "") {
		$.jBox.tip("请完善信息", "error");
		return;
	}
	if(!$('#check1').prop('checked')) {
		$.jBox.tip('请先同意协议', 'error');
		return;
	}
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	ajaxPostAsyncData(checkIdentifyingcode, {
		"code": checkcode,
		"phone": account,
		"sendCodeType":1
	}, false, function(data) {
		var obj = data.resobj;
		if(data.code == "40000") { //检查验证码 
			ajaxPostAsyncData(register, {
				"beicode": beicode,
				"account": account,
				"name": name,
				"password": password,
				"codeSms": checkcode
			}, true, function(data) {
				if(data.code == "40000") { //检查注册
					$.jBox.tip("注册成功!", "success");
					ajaxPostAsyncData(loginAjax, {
						"account": account,
						"password": password
					}, false, function(data) {
						if(data.code == "40000") { //登录login 设置token
							setCookie('cookie_brsy_h5_token', data.resobj.token, 7);
						}

					})
					var uid = data.resobj;
					var mycode = '';
					//根据uid查询用户mycode
					ajaxPostAsyncData(slectInfoByUid, {
						"uid": uid,
						"token": getCookie('cookie_brsy_h5_token'),
						"updateVersion": "V2.0"
					}, false, function(data) {
						if(data.code == "40000") {
							mycode = data.resobj.mycode;
						}
					}, 'json')
					var xuliehaoType = getQueryString('xuliehaoType');
					localStorage.setItem("shipinUid", data.resobj);
					localStorage.setItem("beicode", beicode);
					if(xuliehaoType == '2') {
						// window.setTimeout(function() {
							window.location.href = "/static/forAPP/serialpay.html?uid=" + uid + "&mycode=" + mycode;
						// }, 2000);
					} else {
						// window.setTimeout(function() {
							window.location.href = "/static/forAPP/pay/tiaozhuan.html?mycode=" + mycode + "&uid=" + uid + "&beicode=" + beicode + "&xuliehaoType=" + xuliehaoType;
						// }, 2000);
					}
				} else {
					$.jBox.tip("注册失败!" + data.info, "error");
				}
			}, 'json')
		} else {
			$.jBox.tip("验证码不正确!", "error");
		}
	}, 'json')

}
function selectCodeCheck(){
	var time = new Date().getMilliseconds();
		$('#imgCheckCode').attr('src', '/appVcode/getCode?ver=' + time);
}

/**
 * 获取手机验证码
 */
function getCheckcode() {

	var java_checkCode = getCookie('cookie_brsy_pic_code');
	var checkCodeImg = $('#checkCodeImg').val();
	if(checkCodeImg == null || checkCodeImg == "") {
		$.jBox.tip("图片验证码不能为空", "error");
		return;
	}

	var account = $("#account").val();
	var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	ajaxPostAsyncData(sendCodeCheck, {
		"account": account,
		"sendCodeType": "1",
		"code": checkCodeImg,
		"codeKey": java_checkCode
	}, false, function(data) {
		var obj = data.resobj;
		if(data.code == "40000") {
			$.jBox.tip("验证码发送成功,注意查收!", "success");
		}else if(data.code == "40015"){
			selectCodeCheck();
			$.jBox.tip("图片验证码错误", "error");
		}else{
			selectCodeCheck();
			$.jBox.tip(data.info, "error");
		}
	}, 'json')
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
				// window.setTimeout(function() {
					window.location.href = "/static/forAPP/pay/tiaozhuan.html?mycode=" +
						beicode;
				// }, 2000);
			} else if(obj == "2") {
				window.location.href = "share.html?mycode=" + beicode;
			}
		}
	}, 'json')

}
/*8.17 登录跳转*/
function gologin() {
	var xuliehaoType = getQueryString('xuliehaoType');
	var beicode = getQueryString('mycode');
	window.location.href = "/static/forAPP/login_h5.html?xuliehaoType=" + xuliehaoType + "&beicode=" + beicode;
}
/*10.17下载app*/
function down() {
	window.location.href = "/static/wechat/src/admin/download.html";
}